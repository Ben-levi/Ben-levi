// Projects grid — pulled LIVE from the GitHub API (never goes stale).
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const grid = document.getElementById("proj-grid");
  if (!grid) return;

  const LANG_COLORS = {
    Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", Go: "#00ADD8",
    HCL: "#844FBA", Dockerfile: "#384d54", "C++": "#f34b7d", Java: "#b07219",
  };

  const esc = (s) => String(s || "").replace(/[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ago = (iso) => {
    const d = Math.floor((Date.now() - new Date(iso)) / 864e5);
    if (d < 1) return "today";
    if (d < 30) return `${d}d ago`;
    if (d < 365) return `${Math.floor(d / 30)}mo ago`;
    return `${Math.floor(d / 365)}y ago`;
  };

  function card(r) {
    const color = LANG_COLORS[r.language] || "#8b98ab";
    return `<a class="proj-card panel reveal vis" href="${r.html_url}" target="_blank" rel="noopener">
      <h3><span class="folder">▸</span> ${esc(r.name)}</h3>
      <p>${esc(r.description || "No description yet — but the code speaks for itself.")}</p>
      <div class="proj-meta">
        ${r.language ? `<span><span class="lang-dot" style="background:${color}"></span>${esc(r.language)}</span>` : ""}
        <span>★ ${r.stargazers_count}</span>
        <span>updated ${ago(r.pushed_at)}</span>
      </div>
    </a>`;
  }

  (async function load() {
    try {
      const r = await fetch(
        `https://api.github.com/users/${cfg.githubUser}/repos?sort=pushed&per_page=30`);
      if (!r.ok) throw new Error(String(r.status));
      let repos = (await r.json()).filter((x) => !x.fork && !x.archived);

      // featured first, then by recent activity
      const rank = (x) => {
        const i = cfg.featuredRepos.indexOf(x.name);
        return i === -1 ? 1000 : i;
      };
      repos.sort((a, b) => rank(a) - rank(b) || new Date(b.pushed_at) - new Date(a.pushed_at));

      grid.innerHTML = repos.slice(0, 9).map(card).join("");
    } catch (_) {
      grid.innerHTML = `<div class="proj-card panel">
        <h3><span class="folder">▸</span> GitHub API rate limit reached</h3>
        <p>Live project data will load on refresh. Meanwhile: <a href="https://github.com/${cfg.githubUser}?tab=repositories" target="_blank" rel="noopener">browse all repos →</a></p>
      </div>`;
    }
  })();
})();
