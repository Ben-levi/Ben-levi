variable "aws_region" {
  description = "Primary AWS region (free tier friendly; Lambdas + S3 live here)."
  type        = string
  default     = "eu-central-1"
}

variable "project" {
  description = "Name prefix for all resources."
  type        = string
  default     = "ben-portfolio"
}

variable "github_repo" {
  description = "GitHub repo allowed to deploy via OIDC (owner/name)."
  type        = string
  default     = "Ben-levi/Ben-levi"
}

variable "anthropic_api_key" {
  description = "Anthropic API key for BenBot. Set via TF_VAR_anthropic_api_key — never commit it."
  type        = string
  sensitive   = true
}

variable "chat_model" {
  description = "Claude model for BenBot. Haiku keeps cost at fractions of a cent per chat."
  type        = string
  default     = "claude-haiku-4-5-20251001"
}

variable "allowed_origins" {
  description = "Origins allowed to call the chat/status APIs. Add your CloudFront domain and/or custom domain after the first apply."
  type        = list(string)
  default     = ["https://ben-levi.github.io"]
}

variable "budget_limit_usd" {
  description = "Monthly cost ceiling; you get emailed at 80% and 100%."
  type        = string
  default     = "5"
}

variable "alert_email" {
  description = "Where budget & ops alerts go."
  type        = string
  default     = "philepin@gmail.com"
}

variable "chat_rate_limit_per_10min" {
  description = "Max chat requests per visitor IP per 10 minutes."
  type        = number
  default     = 10
}
