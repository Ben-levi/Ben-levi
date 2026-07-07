# ------------------------------------------------------------------
# Three zero-dependency Python Lambdas:
#   chat   — BenBot (Claude API, grounded in data/ben.md)
#   news   — hourly feed aggregator → s3://site/data/news.json
#   status — real cost + metrics for the Live Ops panel
# ------------------------------------------------------------------

locals {
  runtime = "python3.12"
}

# ---------- packaging ----------

data "archive_file" "chat" {
  type        = "zip"
  output_path = "${path.module}/.build/chat.zip"

  source {
    content  = file("${path.module}/../../backend/chat/handler.py")
    filename = "handler.py"
  }

  # The knowledge base ships inside the function package: edit data/ben.md,
  # push, and the bot's brain updates on the next deploy.
  source {
    content  = file("${path.module}/../../data/ben.md")
    filename = "ben.md"
  }
}

data "archive_file" "news" {
  type        = "zip"
  output_path = "${path.module}/.build/news.zip"

  source {
    content  = file("${path.module}/../../backend/news/handler.py")
    filename = "handler.py"
  }
}

data "archive_file" "status" {
  type        = "zip"
  output_path = "${path.module}/.build/status.zip"

  source {
    content  = file("${path.module}/../../backend/status/handler.py")
    filename = "handler.py"
  }
}

# ---------- shared execution role plumbing ----------

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# ---------- chat ----------

resource "aws_iam_role" "chat" {
  name               = "${var.project}-chat"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy" "chat" {
  name = "chat"
  role = aws_iam_role.chat.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["dynamodb:UpdateItem"]
        Resource = aws_dynamodb_table.rate_limit.arn
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_lambda_function" "chat" {
  function_name    = "${var.project}-chat"
  role             = aws_iam_role.chat.arn
  runtime          = local.runtime
  handler          = "handler.lambda_handler"
  filename         = data.archive_file.chat.output_path
  source_code_hash = data.archive_file.chat.output_base64sha256
  timeout          = 30
  memory_size      = 256

  environment {
    variables = {
      ANTHROPIC_API_KEY = var.anthropic_api_key
      MODEL             = var.chat_model
      RATE_TABLE        = aws_dynamodb_table.rate_limit.name
      ALLOWED_ORIGINS   = join(",", var.allowed_origins)
      MAX_REQ_PER_10MIN = tostring(var.chat_rate_limit_per_10min)
    }
  }
}

resource "aws_lambda_function_url" "chat" {
  function_name      = aws_lambda_function.chat.function_name
  authorization_type = "NONE" # public endpoint; abuse is bounded by the DynamoDB rate limiter
}

# ---------- news ----------

resource "aws_iam_role" "news" {
  name               = "${var.project}-news"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy" "news" {
  name = "news"
  role = aws_iam_role.news.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject"]
        Resource = "${aws_s3_bucket.site.arn}/data/*"
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_lambda_function" "news" {
  function_name    = "${var.project}-news"
  role             = aws_iam_role.news.arn
  runtime          = local.runtime
  handler          = "handler.lambda_handler"
  filename         = data.archive_file.news.output_path
  source_code_hash = data.archive_file.news.output_base64sha256
  timeout          = 60
  memory_size      = 256

  environment {
    variables = {
      SITE_BUCKET = aws_s3_bucket.site.bucket
    }
  }
}

resource "aws_cloudwatch_event_rule" "news_hourly" {
  name                = "${var.project}-news-hourly"
  schedule_expression = "rate(1 hour)"
}

resource "aws_cloudwatch_event_target" "news" {
  rule = aws_cloudwatch_event_rule.news_hourly.name
  arn  = aws_lambda_function.news.arn
}

resource "aws_lambda_permission" "news_events" {
  statement_id  = "AllowEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.news.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.news_hourly.arn
}

# ---------- status ----------

resource "aws_iam_role" "status" {
  name               = "${var.project}-status"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy" "status" {
  name = "status"
  role = aws_iam_role.status.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["dynamodb:GetItem", "dynamodb:PutItem"]
        Resource = aws_dynamodb_table.rate_limit.arn
      },
      {
        Effect   = "Allow"
        Action   = ["ce:GetCostAndUsage"]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["cloudwatch:GetMetricStatistics"]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_lambda_function" "status" {
  function_name    = "${var.project}-status"
  role             = aws_iam_role.status.arn
  runtime          = local.runtime
  handler          = "handler.lambda_handler"
  filename         = data.archive_file.status.output_path
  source_code_hash = data.archive_file.status.output_base64sha256
  timeout          = 20
  memory_size      = 128

  environment {
    variables = {
      RATE_TABLE         = aws_dynamodb_table.rate_limit.name
      CHAT_FUNCTION_NAME = aws_lambda_function.chat.function_name
      ALLOWED_ORIGINS    = join(",", var.allowed_origins)
    }
  }
}

resource "aws_lambda_function_url" "status" {
  function_name      = aws_lambda_function.status.function_name
  authorization_type = "NONE" # read-only, cached, nothing sensitive
}
