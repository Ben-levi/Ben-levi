// Core page behaviour: scroll reveal, background network canvas, footer year.
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Scroll reveal ---
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // --- Footer year ---
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // --- Floating cloud icons (static positions when motion is reduced) ---
  const clouds = document.getElementById("cloudsContainer");
  if (clouds) {
    const svg = '<svg viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 36a11 11 0 0 1-1.6-21.9A15 15 0 0 1 43.6 11 12.5 12.5 0 0 1 48 36z"/></svg>';
    for (let i = 0; i < 8; i++) {
      const c = document.createElement("div");
      c.className = "cloud";
      c.style.width = `${50 + Math.random() * 70}px`;
      c.style.top = `${Math.random() * 90}%`;
      c.style.animationDuration = `${60 + Math.random() * 60}s`;
      c.style.animationDelay = `${Math.random() * -120}s`;
      c.innerHTML = svg;
      clouds.appendChild(c);
    }
  }

  // --- Background: subtle node-network (nod to distributed systems) ---
  const canvas = document.getElementById("net-bg");
  if (!canvas || reduced) return;

  const ctx = canvas.getContext("2d");
  let nodes = [];
  let w, h, raf;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor((w * h) / 26000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
        if (d2 < 130 * 130) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.10 * (1 - d2 / (130 * 130))})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(34, 211, 238, 0.35)";
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }

  // Pause when tab is hidden — don't burn the visitor's battery.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(tick);
  });

  window.addEventListener("resize", resize);
  resize();
  tick();
})();
