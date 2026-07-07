# Hey, I'm Ben Levi ⚡

**DevOps & AI Engineer** · Electrical Engineering background · AWS · Terraform · Kubernetes · Python

I build infrastructure that explains itself — and this repo is the proof:
it's not just my profile, it's my **live portfolio platform**, a real serverless
production system that deploys, monitors, and describes itself.

**🌐 Live site:** [ben-levi.github.io/Ben-levi](https://ben-levi.github.io/Ben-levi/) *(GitHub Pages tier — AWS tier deploys with one `terraform apply`)*

---

## 🧠 What makes this portfolio different

| Feature | How it works |
|---|---|
| 🤖 **BenBot** — LLM chat about me | AWS Lambda + Claude API, grounded strictly in [`data/ben.md`](data/ben.md), per-IP rate-limited via DynamoDB |
| 📊 **Live Ops panel** — no fake metrics | Real GitHub Actions runs, real commit velocity, real month-to-date AWS cost from Cost Explorer, page-load time measured in *your* browser |
| 🚀 **Projects that never go stale** | Rendered from the GitHub API on every page view |
| 📰 **Streaming news feed** | EventBridge → Lambda → curated `news.json` on the CDN (browser falls back to the Hacker News API) |
| 🔐 **Keyless CI/CD** | GitHub Actions → AWS via OIDC federation — zero stored credentials |
| 💸 **Cost as an SLO** | Runs in the AWS free tier (~$1–3/mo incl. LLM tokens), budget alarm at $5, spend displayed publicly |

```
git push ──▶ GitHub Actions ──OIDC──▶ S3 + CloudFront ──▶ you
                    │                        ▲
                    └──▶ λ chat (Claude) · λ news (hourly) · λ status (cost)
```

📐 [Architecture & design decisions](docs/ARCHITECTURE.md) ·
🚀 [Deployment guide](docs/DEPLOYMENT.md) ·
💡 [Roadmap: AI+DevOps projects](docs/IDEAS.md)

## 🗂 Repo map

```
index.html, assets/        zero-framework frontend (progressive enhancement)
backend/{chat,news,status} zero-dependency Python Lambdas
infra/terraform/           the entire AWS platform as code
data/ben.md                BenBot's knowledge base — edit → push → the bot learns
.github/workflows/         CI checks + keyless AWS deploy + Pages fallback
docs/                      architecture, deployment, roadmap
```

## 💻 Tech stack

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%23844FBA.svg?style=for-the-badge&logo=terraform&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Claude](https://img.shields.io/badge/Claude%20API-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

## 📊 GitHub stats

![](https://github-readme-stats.vercel.app/api?username=ben-levi&theme=dark&hide_border=true&include_all_commits=true)
![](https://github-readme-stats.vercel.app/api/top-langs/?username=ben-levi&theme=dark&hide_border=true&layout=compact)

## 🌐 Reach me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/ben-levi)
[![Email](https://img.shields.io/badge/Email-philepin%40gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:philepin@gmail.com)

…or just **ask BenBot on the site** 🤖 — the fastest way to see if we're a fit.

*⚽ soccer fan · 🥋 MMA · 🏠 family guy · building things that stay up*
