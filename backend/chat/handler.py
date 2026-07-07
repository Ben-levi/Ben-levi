"""BenBot chat API — AWS Lambda (Function URL).

Answers questions about Ben using the Claude API, grounded strictly in
data/ben.md (bundled into the deployment package as ben.md).

Design notes:
- Zero external dependencies: the Anthropic API is called with urllib, so the
  deployment package is just this file + ben.md (fast cold starts, no layers).
- Per-IP token-bucket rate limiting in DynamoDB (TTL-expired items) keeps the
  Anthropic bill bounded even if the endpoint is scraped.
- CORS is locked to ALLOWED_ORIGINS.
"""

import json
import os
import time
import urllib.request
import urllib.error

import boto3

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
MODEL = os.environ.get("MODEL", "claude-haiku-4-5-20251001")
TABLE = os.environ.get("RATE_TABLE", "portfolio-rate-limit")
ALLOWED_ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "*").split(",")]
MAX_REQ_PER_10MIN = int(os.environ.get("MAX_REQ_PER_10MIN", "10"))
MAX_TOKENS = int(os.environ.get("MAX_TOKENS", "400"))

_dynamo = boto3.client("dynamodb")

with open(os.path.join(os.path.dirname(__file__), "ben.md"), encoding="utf-8") as f:
    KNOWLEDGE = f.read()

SYSTEM_PROMPT = f"""You are BenBot, the assistant on Ben Levi's portfolio site.
Answer questions about Ben using ONLY the knowledge document below.
Follow the "Assistant behaviour rules" section of the document exactly.

<knowledge>
{KNOWLEDGE}
</knowledge>"""


def _cors(origin):
    allowed = origin if (origin in ALLOWED_ORIGINS or "*" in ALLOWED_ORIGINS) else ALLOWED_ORIGINS[0]
    return {
        "Access-Control-Allow-Origin": allowed,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }


def _resp(status, body, origin=""):
    return {"statusCode": status, "headers": _cors(origin), "body": json.dumps(body)}


def _rate_limited(ip):
    """Sliding 10-minute window counter per IP, expired via DynamoDB TTL."""
    window = int(time.time() // 600)
    key = {"pk": {"S": f"rl#{ip}#{window}"}}
    item = _dynamo.update_item(
        TableName=TABLE,
        Key=key,
        UpdateExpression="ADD #c :one SET #ttl = :ttl",
        ExpressionAttributeNames={"#c": "count", "#ttl": "expires_at"},
        ExpressionAttributeValues={
            ":one": {"N": "1"},
            ":ttl": {"N": str(int(time.time()) + 1200)},
        },
        ReturnValues="UPDATED_NEW",
    )
    return int(item["Attributes"]["count"]["N"]) > MAX_REQ_PER_10MIN


def _ask_claude(message, history):
    messages = [
        {"role": m["role"], "content": str(m.get("content", ""))[:1000]}
        for m in history[-8:]
        if m.get("role") in ("user", "assistant")
    ]
    messages.append({"role": "user", "content": message})

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps({
            "model": MODEL,
            "max_tokens": MAX_TOKENS,
            "system": SYSTEM_PROMPT,
            "messages": messages,
        }).encode(),
        headers={
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=25) as r:
        data = json.loads(r.read())
    return "".join(b.get("text", "") for b in data.get("content", []))


def lambda_handler(event, _context):
    http = event.get("requestContext", {}).get("http", {})
    origin = (event.get("headers") or {}).get("origin", "")

    if http.get("method") == "OPTIONS":
        return _resp(204, {}, origin)
    if http.get("method") != "POST":
        return _resp(405, {"error": "POST only"}, origin)

    try:
        body = json.loads(event.get("body") or "{}")
        message = str(body.get("message", "")).strip()[:500]
        history = body.get("history", [])
        if not message:
            return _resp(400, {"error": "empty message"}, origin)
    except (json.JSONDecodeError, AttributeError):
        return _resp(400, {"error": "invalid JSON"}, origin)

    ip = http.get("sourceIp", "unknown")
    try:
        if _rate_limited(ip):
            return _resp(429, {"error": "rate limited"}, origin)
    except Exception as exc:  # rate limiter must never take the chat down
        print(f"rate-limit check failed: {exc}")

    try:
        reply = _ask_claude(message, history)
        return _resp(200, {"reply": reply}, origin)
    except urllib.error.HTTPError as exc:
        print(f"anthropic error {exc.code}: {exc.read()[:500]}")
        return _resp(502, {"error": "upstream LLM error"}, origin)
    except Exception as exc:
        print(f"unexpected error: {exc}")
        return _resp(500, {"error": "internal error"}, origin)
