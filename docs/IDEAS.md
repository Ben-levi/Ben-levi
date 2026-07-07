# Roadmap — out-of-the-box AI + DevOps projects that don't exist on every portfolio

Curated for Ben's specific edge: **DevOps × AI × Electrical Engineering/IoT**.
Each idea solves a real problem, is demo-able on this site, and is cheap to run.
Ordered roughly by effort. The differentiator in every one: *live, public,
honest* — recruiters can poke it, not just read about it.

---

## Ship next (weekend-sized)

### 1. 💥 The Chaos Button
A literal red button on this site: **"Break my site."** Clicking it triggers a
controlled chaos experiment (Lambda kills the news cache, corrupts a canary
object, or throttles an endpoint) — and visitors watch the monitoring detect
it and self-heal in real time, with a live event log streaming to the page.
Almost nobody demos chaos engineering *interactively*. Guardrails: one
experiment at a time, cooldown in DynamoDB, blast radius limited to sacrificial
resources.

### 2. 🧾 Public postmortems page
Every real failure of this site (broken deploy, rate-limit incident, DNS typo)
gets a blameless postmortem in `docs/postmortems/`, rendered on the site.
Senior engineers are distinguished by how they talk about failure. An
EventBridge rule can even open the postmortem issue automatically when a
deploy fails.

### 3. 💸 Cost-per-visitor ticker
You already show month-to-date spend; divide by CloudFront request count and
show **"serving you this page cost Ben $0.000041"**. Memorable, funny, and
demonstrates unit-economics thinking that most engineers never show.

---

## Flagship candidates (1–3 weeks each)

### 4. 🤖 AI SRE that files its own PRs ("Self-healing repo")
A scheduled Lambda feeds this site's CloudWatch alarms + logs to Claude, which
diagnoses the incident, writes a runbook entry, and **opens a GitHub PR with
the proposed fix** (e.g. bump a timeout, fix a feed URL). Human-in-the-loop:
you merge it. The whole loop is visible on the site: alert → AI diagnosis → PR
link. This is AIOps as a working demo, not a buzzword.

### 5. 🏠 IoT fleet with a real cloud control plane (EE superpower)
ESP32 sensors at home (power draw, temperature, water) streaming MQTT →
AWS IoT Core → Kinesis/Lambda → a **public live dashboard on this site**.
Add the DevOps meat: OTA firmware updates through a CI pipeline (a *hardware*
deploy pipeline with staged rollout + automatic rollback on failed heartbeat).
Almost no DevOps portfolio has physical devices in its deployment graph —
yours can, credibly, because you're an EE.

### 6. ⚡ Grid-aware / carbon-aware deployments
Use electricity-grid carbon/price APIs (e.g. Electricity Maps) to schedule
batch jobs and non-urgent deploys for the cleanest/cheapest hours, and show
the live decision on the site: "next deploy window: 14:00 (solar peak)."
GreenOps is hot, genuinely scarce on portfolios, and fuses your EE intuition
with platform engineering.

### 7. 🎤 "Interview me" voice/chat agent with receipts
Upgrade BenBot: every claim it makes links to evidence (a commit, a Grafana
panel, a repo). Recruiter asks "has Ben done Kubernetes?" → answer + links to
actual manifests and a running cluster dashboard. An LLM with *citations into
your own infrastructure* beats any generic chatbot.

---

## Ambitious (a month+, conference-talk material)

### 8. 🕹️ Kubernetes-in-public
A tiny k3s cluster (one Hetzner/Linode node, ~$5/mo) running real workloads
for this site, with **read-only public Grafana + ArgoCD** dashboards embedded
here. "View my cluster live" is a link no CV has. Add AI: error-rate spike →
Claude analyses events → auto-rollback via ArgoCD + explanation posted to the
site.

### 9. 📉 LLM token FinOps exporter (open source play)
A small OSS tool: Prometheus exporter + Grafana dashboard for LLM API spend
per feature/user/prompt-version, with anomaly alerts ("your RAG pipeline's
cost doubled after yesterday's prompt change"). Every AI team has this pain in
2026; almost no lightweight OSS covers it. Dogfood it on BenBot and show the
live dashboard here.

### 10. 🧯 Incident simulator as a game
"You're on call" — a browser game on this site where visitors triage a
simulated production incident (real logs, real dashboards, multiple-choice
actions), scored at the end. Built from your own postmortems (#2). Recruiters
*play your experience*. Viral-friendly, and it exercises the same Lambda/S3
stack you already run.

---

## Principles that keep this from becoming AI slop
- **Live beats described.** Every project must expose a URL a stranger can poke.
- **Honest beats polished.** Show failures, costs, and limits — that's the senior signal.
- **Your edge is EE + IoT.** When in doubt, pick the project that touches
  physical hardware or electricity — that's the moat no bootcamp grad has.
- **Everything is code.** Any manual step is a bug in the portfolio.
