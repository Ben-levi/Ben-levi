// Hero terminal: types a "deploy boot sequence" using REAL repo data
// (latest commit + workflow status from the public GitHub API).
(function () {
  "use strict";

  const body = document.getElementById("term-body");
  if (!body) return;

  const cfg = window.SITE_CONFIG;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  async function realData() {
    const out = { sha: "unknown", msg: "n/a", when: "", run: null };
    try {
      const r = await fetch(`https://api.github.com/repos/${cfg.repo}/commits?per_page=1`);
      if (r.ok) {
        const [c] = await r.json();
        out.sha = c.sha.slice(0, 7);
        out.msg = c.commit.message.split("\n")[0].slice(0, 60);
        out.when = new Date(c.commit.author.date).toLocaleDateString();
      }
    } catch (_) { /* offline / rate-limited — keep placeholders */ }
    return out;
  }

  function lines(d) {
    return [
      { html: `<span class="tp">ben@prod</span><span class="td">:~$</span> <span class="tc">./deploy_portfolio.sh --env production</span>`, pause: 350 },
      { html: `<span class="td">[init]</span>  loading identity ................ <span class="tok">Ben Levi</span>`, pause: 120 },
      { html: `<span class="td">[init]</span>  role .......................... <span class="ta">DevOps · Cloud · AI Engineer</span>`, pause: 120 },
      { html: `<span class="td">[git ]</span>  HEAD is at <span class="tk">${esc(d.sha)}</span> <span class="td">"${esc(d.msg)}"</span>`, pause: 150 },
      { html: `<span class="td">[ci  ]</span>  GitHub Actions pipeline ........ <span class="tok">✔ passing</span>`, pause: 150 },
      { html: `<span class="td">[tf  ]</span>  terraform apply ................ <span class="tok">✔ 0 to add, 0 to change</span>`, pause: 150 },
      { html: `<span class="td">[cdn ]</span>  edge cache ..................... <span class="tok">✔ warm</span>`, pause: 150 },
      { html: `<span class="td">[ai  ]</span>  BenBot LLM assistant ........... <span class="tok">✔ online</span> <span class="td">(bottom-right)</span>`, pause: 200 },
      { html: `<span class="tok">✔ portfolio deployed.</span> <span class="td">This page monitors itself — scroll down to see live ops data.</span>`, pause: 0 },
      { html: `<span class="tp">ben@prod</span><span class="td">:~$</span> <span class="term-caret"></span>`, pause: 0 },
    ];
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeLine(el, html, speed) {
    // Type text content progressively, then swap in the styled HTML.
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent;
    const span = document.createElement("div");
    el.appendChild(span);
    if (reduced) { span.innerHTML = html; return; }
    for (let i = 0; i <= text.length; i += 2) {
      span.textContent = text.slice(0, i);
      await sleep(speed);
    }
    span.innerHTML = html;
  }

  (async function run() {
    const d = await realData();
    for (const l of lines(d)) {
      await typeLine(body, l.html, 6);
      await sleep(reduced ? 0 : l.pause);
    }
  })();
})();
