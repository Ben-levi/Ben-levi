"""News pipeline — AWS Lambda, fired hourly by EventBridge.

Pulls DevOps / cloud / AI engineering headlines from several public feeds,
merges + dedupes them, and writes a single cache-friendly news.json to the
site bucket. The frontend renders it; CloudFront caches it at the edge.

Zero external dependencies: urllib + xml.etree only.
"""

import json
import os
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

import boto3

BUCKET = os.environ["SITE_BUCKET"]
KEY = os.environ.get("NEWS_KEY", "data/news.json")
MAX_ITEMS = int(os.environ.get("MAX_ITEMS", "24"))

RSS_FEEDS = [
    ("aws blog", "https://aws.amazon.com/blogs/devops/feed/"),
    ("kubernetes", "https://kubernetes.io/feed.xml"),
    ("cncf", "https://www.cncf.io/feed/"),
    ("hashicorp", "https://www.hashicorp.com/blog/feed.xml"),
]
HN_QUERY = "devops OR kubernetes OR terraform OR aws OR llm OR sre"

_s3 = boto3.client("s3")


def _get(url, timeout=10):
    req = urllib.request.Request(url, headers={"User-Agent": "ben-levi-portfolio-news/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def _parse_ts(text):
    try:
        return int(parsedate_to_datetime(text).timestamp())
    except (TypeError, ValueError):
        return int(time.time())


def fetch_rss(source, url):
    items = []
    try:
        root = ET.fromstring(_get(url))
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        # RSS 2.0
        for it in root.iter("item"):
            items.append({
                "source": source,
                "title": (it.findtext("title") or "").strip(),
                "url": (it.findtext("link") or "").strip(),
                "ts": _parse_ts(it.findtext("pubDate")),
            })
        # Atom
        for it in root.iter("{http://www.w3.org/2005/Atom}entry"):
            link = it.find("atom:link", ns)
            items.append({
                "source": source,
                "title": (it.findtext("atom:title", default="", namespaces=ns)).strip(),
                "url": link.get("href", "") if link is not None else "",
                "ts": _parse_ts(it.findtext("atom:updated", default="", namespaces=ns)) or int(time.time()),
            })
    except Exception as exc:  # noqa: BLE001 - one broken feed must not kill the pipeline
        print(f"feed {source} failed: {exc}")
    return items[:8]


def fetch_hackernews():
    try:
        data = json.loads(_get(
            "https://hn.algolia.com/api/v1/search_by_date?query="
            + urllib.parse.quote(HN_QUERY)
            + "&tags=story&numericFilters=points>40&hitsPerPage=10"))
        return [{
            "source": "hacker news",
            "title": h.get("title", ""),
            "url": h.get("url") or f"https://news.ycombinator.com/item?id={h['objectID']}",
            "ts": h.get("created_at_i", int(time.time())),
        } for h in data.get("hits", [])]
    except Exception as exc:  # noqa: BLE001 - HN outage must not kill the pipeline
        print(f"hn failed: {exc}")
        return []


def lambda_handler(_event, _context):
    items = fetch_hackernews()
    for source, url in RSS_FEEDS:
        items.extend(fetch_rss(source, url))

    seen, unique = set(), []
    for it in sorted(items, key=lambda x: x["ts"], reverse=True):
        if it["title"] and it["url"] and it["url"] not in seen:
            seen.add(it["url"])
            unique.append(it)

    payload = {"generated_at": int(time.time()), "items": unique[:MAX_ITEMS]}
    _s3.put_object(
        Bucket=BUCKET,
        Key=KEY,
        Body=json.dumps(payload).encode(),
        ContentType="application/json",
        CacheControl="public, max-age=1800",
    )
    print(f"wrote {len(payload['items'])} items to s3://{BUCKET}/{KEY}")
    return {"items": len(payload["items"])}
