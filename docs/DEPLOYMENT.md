# Deployment guide

The site works **right now** on GitHub Pages with zero setup (Tier 0).
This guide takes you to Tier 1: the AWS serverless backend.
Time required: ~30 minutes. Ongoing cost: ~$1–3/month.

## Prerequisites
- AWS account (free tier is enough) + AWS CLI configured locally (`aws sts get-caller-identity` works)
- Terraform ≥ 1.5 (`brew install terraform` / [download](https://developer.hashicorp.com/terraform/downloads))
- An Anthropic API key from https://console.anthropic.com (BenBot uses Haiku — cents per month)

## 1. Provision the infrastructure

```bash
cd infra/terraform

export TF_VAR_anthropic_api_key="sk-ant-..."   # never committed anywhere

terraform init
terraform plan     # review: ~25 resources, all free-tier
terraform apply
```

`apply` prints everything you need:

```
chat_api_url               = "https://xxxx.lambda-url.eu-central-1.on.aws/"
status_api_url             = "https://yyyy.lambda-url.eu-central-1.on.aws/"
news_feed_url              = "https://dddd.cloudfront.net/data/news.json"
site_url                   = "https://dddd.cloudfront.net"
site_bucket                = "ben-portfolio-site-abc123"
cloudfront_distribution_id = "E2ABCDEF"
deploy_role_arn            = "arn:aws:iam::123456789012:role/ben-portfolio-github-deploy"
```

## 2. Point the frontend at the backend

Edit `assets/js/config.js` and paste the three URLs:

```js
chatApiUrl:   "https://xxxx.lambda-url.eu-central-1.on.aws/",
statusApiUrl: "https://yyyy.lambda-url.eu-central-1.on.aws/",
newsFeedUrl:  "https://dddd.cloudfront.net/data/news.json",
```

Then lock CORS to your real origins in `infra/terraform/variables.tf`
(`allowed_origins` → add your CloudFront URL) and `terraform apply` again.

## 3. Wire up keyless CI/CD

In the GitHub repo → Settings:

**Secrets → Actions** (values from the terraform outputs):
| Secret | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | `deploy_role_arn` |
| `AWS_REGION` | e.g. `eu-central-1` |
| `SITE_BUCKET` | `site_bucket` |
| `CLOUDFRONT_DIST_ID` | `cloudfront_distribution_id` |

**Variables → Actions**:
| Variable | Value |
|---|---|
| `AWS_DEPLOY_ENABLED` | `true` |

From now on every push to `main` syncs the site to S3, redeploys the three
Lambdas, and invalidates the CDN — authenticated via OIDC, no keys stored.

## 4. Prime the news pipeline (optional — it runs hourly anyway)

```bash
aws lambda invoke --function-name ben-portfolio-news /dev/null
```

## 5. Smoke test

```bash
curl -s "$(terraform output -raw status_api_url)" | jq .
curl -s -X POST "$(terraform output -raw chat_api_url)" \
  -H 'Content-Type: application/json' \
  -d '{"message":"What is the tech stack?"}' | jq .reply
```

Open the `site_url` — the Live Ops panel now shows real AWS spend, and BenBot
answers free-form questions.

## Custom domain (optional next step)
1. Buy/point a domain (Route 53 hosted zone ≈ $0.50/mo, or keep DNS elsewhere).
2. Request an ACM cert **in us-east-1**, DNS-validate it.
3. Add `aliases` + `acm_certificate_arn` to the CloudFront distribution in
   `site.tf`, apply, and point a CNAME/ALIAS at the distribution.

## Teardown
```bash
terraform destroy   # removes everything; the repo + GitHub Pages keep working
```

## Troubleshooting
- **Chat returns 502** — check `aws logs tail /aws/lambda/ben-portfolio-chat --follow`;
  usually a wrong/expired Anthropic key.
- **Cost shows n/a** — new accounts need ~24h before Cost Explorer has data,
  and it must be enabled once in the console (Billing → Cost Explorer).
- **Deploy job skipped** — the workflow is gated on the `AWS_DEPLOY_ENABLED`
  repo variable so Pages-only users never see red ✗ runs.
