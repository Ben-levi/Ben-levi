# Single on-demand table: per-IP rate-limit counters (TTL-expired)
# and the cached status payload. Pennies per month at portfolio traffic.

resource "aws_dynamodb_table" "rate_limit" {
  name         = "${var.project}-rate-limit"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
}
