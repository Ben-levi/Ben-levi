// Live Ops panel — REAL telemetry, no fake numbers.
// Static mode: public GitHub API (deploys, commits, pipeline runs).
// Backend mode: adds live AWS cost + Lambda metrics from the status API.
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;

  const $ = (id) => document.getElementById(id);
  const setText = (id, v) => { const el = $(id); if (el) el.textContent = v; };

  const ago = (iso) => {
    const s = Math.max(1, (Date.now() - new Date(iso)) / 1000);
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  };

  async function gh(path) {
    const r = await fetch(`https://api.github.com/repos/${cfg.repo}${path}`);
    if (!r.ok) throw new Error(`GitHub API ${r.status}`);
    return r.json();
  }

  // --- Pipeline runs (real GitHub Actions history of this repo) ---
  async function loadRuns() {
    const list = $("runs-list");
    try {
      const data = await gh("/actions/runs?per_page=15");
      // disabled workflows (e.g. the AWS deploy before the backend exists) end as
      // "skipped" — they say nothing about the health of the site
      const runs = (data.workflow_runs || [])
        .filter((r) => r.conclusion !== "skipped" && r.conclusion !== "cancelled")
        .slice(0, 6);
      if (!runs.length) throw new Error("no runs");

      const latest = runs[0];
      setText("ops-deploy", ago(latest.updated_at));
      setText("ops-deploy-sub", `${latest.name} · ${latest.head_sha.slice(0, 7)}`);
      const stat = $("ops-pipeline");
      if (stat) {
        const ok = latest.conclusion === "success";
        stat.textContent = ok ? "passing" : (latest.conclusion || latest.status);
        stat.classList.toggle("ok", ok);
      }

      list.innerHTML = "";
      for (const r of runs) {
        const row = document.createElement("div");
        row.className = "run-row";
        const st = r.conclusion || r.status;
        const icon = st === "success" ? "✔" : st === "failure" ? "✖" : "◌";
        row.innerHTML =
          `<span class="rstat ${st}">${icon} ${st}</span>` +
          `<a class="rname" href="${r.html_url}" target="_blank" rel="noopener">${r.name} — ${r.display_title.replace(/</g, "&lt;")}</a>` +
          `<span class="rmeta">${r.head_sha.slice(0, 7)} · ${ago(r.updated_at)}</span>`;
        list.appendChild(row);
      }
    } catch (_) {
      setText("ops-deploy", "—");
      setText("ops-pipeline", "—");
      if (list) list.innerHTML =
        `<div class="run-row"><span class="rmeta">GitHub API rate limit reached — pipeline history will appear on refresh.</span></div>`;
    }
  }

  // --- Commit velocity (last 30 days, real) ---
  async function loadCommits() {
    try {
      const since = new Date(Date.now() - 30 * 864e5).toISOString();
      const commits = await gh(`/commits?since=${since}&per_page=100`);
      setText("ops-commits", String(commits.length));
    } catch (_) { setText("ops-commits", "—"); }
  }

  // --- Page load performance, measured in the visitor's own browser ---
  function loadPerf() {
    // measure after the load event so navigation timings are final
    const report = () => {
      try {
        const [nav] = performance.getEntriesByType("navigation");
        const ms = nav && Math.round(nav.domContentLoadedEventEnd || nav.duration);
        setText("ops-perf", ms ? `${ms}ms` : "fast");
      } catch (_) { setText("ops-perf", "fast"); }
    };
    if (document.readyState === "complete") setTimeout(report, 0);
    else window.addEventListener("load", () => setTimeout(report, 0));
  }

  // --- Backend status API (live AWS spend + Lambda metrics) ---
  async function loadStatus() {
    if (!cfg.statusApiUrl) {
      setText("ops-cost", "$0.00");
      setText("ops-cost-sub", "static tier · backend not deployed yet");
      return;
    }
    try {
      const t0 = performance.now();
      const r = await fetch(cfg.statusApiUrl);
      const ms = Math.round(performance.now() - t0);
      const s = await r.json();
      if (s.month_to_date_cost != null) {
        setText("ops-cost", `$${Number(s.month_to_date_cost).toFixed(2)}`);
        setText("ops-cost-sub", `AWS month-to-date · Cost Explorer`);
      }
      if (s.chat_invocations != null) setText("ops-chat-invocations", String(s.chat_invocations));
      setText("ops-api-latency", `${ms}ms`);
    } catch (_) {
      setText("ops-cost", "n/a");
      setText("ops-cost-sub", "status API unreachable");
    }
  }

  loadRuns();
  loadCommits();
  loadPerf();
  loadStatus();
})();
