// BenBot — LLM chat about Ben.
// Backend mode: POSTs to the AWS Lambda chat API (Claude, grounded in data/ben.md).
// Static mode: keyword-matched answers from a small embedded knowledge base,
// with an honest note that the full LLM backend ships with `terraform apply`.
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const fab = document.getElementById("chat-fab");
  const panel = document.getElementById("chat-panel");
  const msgs = document.getElementById("chat-msgs");
  const input = document.getElementById("chat-input");
  const send = document.getElementById("chat-send");
  const form = document.getElementById("chat-form");
  if (!fab || !panel) return;

  const history = [];

  const OFFLINE_KB = [
    { k: ["who", "about", "ben", "yourself"], a: "Ben Levi is a DevOps & AI engineer with an Electrical Engineering background. He builds cloud-native systems on AWS — CI/CD pipelines, Kubernetes, Terraform — and loves wiring LLMs into real infrastructure (like me!). Off-duty: soccer ⚽, MMA 🥋, and family time 🏠." },
    { k: ["skill", "stack", "tech", "tool"], a: "Core stack: AWS (Lambda, S3, CloudFront, EC2), Terraform, Docker, Kubernetes, GitHub Actions, Jenkins, Python, Linux, Nginx, MongoDB/MySQL, and monitoring with CloudWatch/Grafana. On the AI side: LLM APIs (Claude), RAG pipelines, and IoT/edge with ESP32 & MQTT." },
    { k: ["project", "built", "portfolio", "work"], a: "Highlights: (1) AWS_APP — a cloud-native to-do app simulating a real production deployment; (2) this very site — a serverless portfolio that monitors itself: Terraform-managed S3+CloudFront, Lambda APIs, a live news pipeline, and me, an LLM chat. Scroll to Projects for the live list straight from GitHub." },
    { k: ["contact", "email", "hire", "reach", "linkedin"], a: "Reach Ben at philepin@gmail.com, or via GitHub (github.com/Ben-levi) and LinkedIn (linkedin.com/in/ben-levi). He's open to DevOps/Platform/AI-infrastructure roles and collaborations." },
    { k: ["site", "how", "infra", "architecture", "aws"], a: "This site is its own case study: static frontend on S3 behind CloudFront (deployed by GitHub Actions via OIDC — no stored AWS keys), Terraform for all infra, Lambda Function URLs for the chat + status APIs, an EventBridge-scheduled Lambda streaming engineering news, and real telemetry on the Live Ops panel. See the Architecture section for the diagram." },
  ];

  function addMsg(text, who) {
    const el = document.createElement("div");
    el.className = `msg ${who}`;
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function offlineAnswer(q) {
    const ql = q.toLowerCase();
    let best = null, bestScore = 0;
    for (const e of OFFLINE_KB) {
      const score = e.k.filter((k) => ql.includes(k)).length;
      if (score > bestScore) { bestScore = score; best = e; }
    }
    const note = "\n\n(offline mode — the full Claude-powered backend answers free-form once deployed: docs/DEPLOYMENT.md)";
    if (best) return best.a + note;
    return "I can tell you about Ben's skills, projects, this site's architecture, or how to contact him. Try one of the suggestions below!" + note;
  }

  async function backendAnswer(q) {
    const r = await fetch(cfg.chatApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q, history: history.slice(-8) }),
    });
    if (r.status === 429) return "Whoa, I'm rate-limited right now (cost control is a DevOps skill too 😄). Try again in a minute.";
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    return data.reply;
  }

  async function ask(q) {
    addMsg(q, "user");
    history.push({ role: "user", content: q });
    const typing = addMsg("thinking…", "bot");
    typing.classList.add("typing");
    let reply;
    try {
      reply = cfg.chatApiUrl ? await backendAnswer(q) : offlineAnswer(q);
    } catch (_) {
      reply = offlineAnswer(q);
    }
    typing.classList.remove("typing");
    typing.textContent = reply;
    history.push({ role: "assistant", content: reply });
    msgs.scrollTop = msgs.scrollHeight;
  }

  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      if (!msgs.childElementCount) {
        addMsg("Hey! I'm BenBot 🤖 — ask me anything about Ben: his skills, projects, or how this site runs itself on AWS.", "bot");
      }
      input.focus();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });

  document.querySelectorAll(".chat-suggest button").forEach((b) =>
    b.addEventListener("click", () => ask(b.textContent)));

  // Honest mode badge
  const sub = document.getElementById("chat-mode");
  if (sub) sub.textContent = cfg.chatApiUrl ? "Claude · live on AWS Lambda" : "offline mode · LLM backend ready to deploy";
})();
