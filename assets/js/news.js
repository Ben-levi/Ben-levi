// Live engineering news feed.
// Backend mode: reads news.json produced by the hourly Lambda pipeline.
// Static mode: falls back to the Hacker News Algolia API (CORS-enabled).
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const list = document.getElementById("news-list");
  if (!list) return;

  const esc = (s) => String(s || "").replace(/[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ago = (ts) => {
    const s = Math.max(60, (Date.now() - ts) / 1000);
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`;
    return `${Math.floor(s / 86400)}d`;
  };

  function render(items) {
    list.innerHTML = items.slice(0, 8).map((it) => `
      <div class="news-item panel">
        <span class="src">${esc(it.source)}</span>
        <a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.title)}</a>
        <span class="when">${ago(it.ts)} ago</span>
      </div>`).join("");
  }

  async function fromPipeline() {
    const r = await fetch(cfg.newsFeedUrl, { cache: "no-store" });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    render(data.items.map((it) => ({ ...it, ts: it.ts * 1000 })));
    const badge = document.getElementById("news-mode");
    if (badge) badge.textContent = "streamed hourly by an AWS Lambda pipeline";
  }

  async function fromHackerNews() {
    const q = encodeURIComponent("devops OR kubernetes OR terraform OR aws OR llm");
    const r = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${q}&tags=story&numericFilters=points>30&hitsPerPage=8`);
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    render(data.hits.map((h) => ({
      source: "hacker news",
      title: h.title,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      ts: h.created_at_i * 1000,
    })));
  }

  (async function load() {
    try {
      if (cfg.newsFeedUrl) return await fromPipeline();
      await fromHackerNews();
    } catch (_) {
      try { await fromHackerNews(); }
      catch (__) {
        list.innerHTML = `<div class="news-item panel"><span class="src">offline</span>
          <span>Feed unavailable right now — check back shortly.</span></div>`;
      }
    }
  })();
})();
