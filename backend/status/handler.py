"""Status API — AWS Lambda (Function URL, GET).

Exposes real operational data about this portfolio's own infrastructure:
- month-to-date AWS cost (Cost Explorer)
- chat Lambda invocations over the last 7 days (CloudWatch)

Cost Explorer charges $0.01 PER API CALL, so results are cached in DynamoDB
for 6 hours — the endpoint can be hammered without moving the bill.
"""

import json
import os
import time
from datetime import datetime, timedelta, timezone

import boto3

TABLE = os.environ.get("RATE_TABLE", "portfolio-rate-limit")
CHAT_FUNCTION = os.environ.get("CHAT_FUNCTION_NAME", "portfolio-chat")
ALLOWED_ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "*").split(",")]
CACHE_SECONDS = int(os.environ.get("CACHE_SECONDS", "21600"))  # 6h

_dynamo = boto3.client("dynamodb")
_ce = boto3.client("ce", region_name="us-east-1")  # Cost Explorer lives in us-east-1
_cw = boto3.client("cloudwatch")


def _cors(origin):
    allowed = origin if (origin in ALLOWED_ORIGINS or "*" in ALLOWED_ORIGINS) else ALLOWED_ORIGINS[0]
    return {
        "Access-Control-Allow-Origin": allowed,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
    }


def _cached():
    try:
        item = _dynamo.get_item(TableName=TABLE, Key={"pk": {"S": "status#cache"}}).get("Item")
        if item and int(item["expires_at"]["N"]) > time.time():
            return json.loads(item["payload"]["S"])
    except Exception as exc:
        print(f"cache read failed: {exc}")
    return None


def _store(payload):
    try:
        _dynamo.put_item(TableName=TABLE, Item={
            "pk": {"S": "status#cache"},
            "payload": {"S": json.dumps(payload)},
            "expires_at": {"N": str(int(time.time()) + CACHE_SECONDS)},
        })
    except Exception as exc:
        print(f"cache write failed: {exc}")


def _month_to_date_cost():
    now = datetime.now(timezone.utc)
    start = now.replace(day=1).strftime("%Y-%m-%d")
    end = (now + timedelta(days=1)).strftime("%Y-%m-%d")
    res = _ce.get_cost_and_usage(
        TimePeriod={"Start": start, "End": end},
        Granularity="MONTHLY",
        Metrics=["UnblendedCost"],
    )
    total = sum(
        float(r["Total"]["UnblendedCost"]["Amount"]) for r in res["ResultsByTime"]
    )
    return round(total, 2)


def _chat_invocations_7d():
    now = datetime.now(timezone.utc)
    res = _cw.get_metric_statistics(
        Namespace="AWS/Lambda",
        MetricName="Invocations",
        Dimensions=[{"Name": "FunctionName", "Value": CHAT_FUNCTION}],
        StartTime=now - timedelta(days=7),
        EndTime=now,
        Period=86400 * 7,
        Statistics=["Sum"],
    )
    points = res.get("Datapoints", [])
    return int(points[0]["Sum"]) if points else 0


def lambda_handler(event, _context):
    origin = (event.get("headers") or {}).get("origin", "")

    payload = _cached()
    if payload is None:
        payload = {"generated_at": int(time.time())}
        try:
            payload["month_to_date_cost"] = _month_to_date_cost()
        except Exception as exc:
            print(f"cost explorer failed: {exc}")
        try:
            payload["chat_invocations"] = _chat_invocations_7d()
        except Exception as exc:
            print(f"cloudwatch failed: {exc}")
        _store(payload)

    return {"statusCode": 200, "headers": _cors(origin), "body": json.dumps(payload)}
