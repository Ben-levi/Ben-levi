output "site_url" {
  description = "Your live site (put behind a custom domain later if you like)."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "site_bucket" {
  description = "S3 bucket the CI pipeline syncs the frontend into."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "Needed by CI for cache invalidation (secret CLOUDFRONT_DIST_ID)."
  value       = aws_cloudfront_distribution.site.id
}

output "chat_api_url" {
  description = "Paste into assets/js/config.js → chatApiUrl."
  value       = aws_lambda_function_url.chat.function_url
}

output "status_api_url" {
  description = "Paste into assets/js/config.js → statusApiUrl."
  value       = aws_lambda_function_url.status.function_url
}

output "news_feed_url" {
  description = "Paste into assets/js/config.js → newsFeedUrl."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}/data/news.json"
}

output "deploy_role_arn" {
  description = "Set as GitHub repo secret AWS_DEPLOY_ROLE_ARN."
  value       = aws_iam_role.deploy.arn
}
