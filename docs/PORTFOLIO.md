# Portfolio site — how it works

This repo doubles as the source of my portfolio site:
**[ben-levi.github.io/Ben-levi](https://ben-levi.github.io/Ben-levi/)**.
It is served from GitHub Pages today; a full serverless AWS design is written
in Terraform and validated in CI, ready to `terraform apply`.

## Features

| Feature | How it works |
|---|---|
| 🤖 **BenBot** — chat about me | Offline keyword mode today. Designed backend: AWS Lambda + Claude API, grounded strictly in [`data/ben.md`](../data/ben.md), per-IP rate-limited via DynamoDB |
| 📊 **Live Ops panel** — no fake metrics | Real GitHub Actions runs and commit velocity from the GitHub API, page-load time measured in *your* browser; month-to-date AWS cost once the backend is deployed |
| 🚀 **Projects that never go stale** | Rendered from the GitHub API on every page view |
| 📰 **News feed** | Hacker News API in the browser today; designed pipeline: EventBridge → Lambda → curated `news.json` |
| 🔐 **Keyless CI/CD** | GitHub Actions → AWS via OIDC federation — zero stored credentials |
| 💸 **Cost as an SLO** | Designed for the AWS free tier, budget alarm at $5 |

## Target architecture

```
git push ──▶ GitHub Actions ──OIDC──▶ S3 + CloudFront ──▶ you
                    │                        ▲
                    └──▶ λ chat (Claude) · λ news (hourly) · λ status (cost)
```

📐 [Architecture & design decisions](ARCHITECTURE.md) ·
🚀 [Deployment guide](DEPLOYMENT.md) ·
💡 [Roadmap: AI + DevOps project ideas](IDEAS.md)

## Repo map

```
index.html, assets/        zero-framework frontend (progressive enhancement)
privacy.html, terms.html   policies for the Customer Manager WhatsApp project
backend/{chat,news,status} zero-dependency Python Lambdas
infra/terraform/           the AWS platform as code
data/ben.md                BenBot's knowledge base — edit → push → the bot learns
.github/workflows/         CI checks (ruff, terraform validate, HTML) + AWS deploy
docs/                      architecture, deployment, roadmap
```
