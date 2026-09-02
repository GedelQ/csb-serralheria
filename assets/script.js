/* =========================================================
   CSB Cleiton — Interações v2
   ========================================================= */
(function () {
  "use strict";

  /* Ano dinâmico no rodapé */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header escurece na rolagem */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  };
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", closeNav));
  window.addEventListener("resize", () => { if (window.innerWidth > 560) closeNav(); });

  /* Reveal on scroll */
  const targets = document.querySelectorAll(".diff, .prod__card, .sec-head, .sobre__in, .cta__in");
  targets.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("visible"));
  }

  /* Contagem animada: linhas de produtos */
  const stat = document.getElementById("statLines");
  if (stat && "IntersectionObserver" in window) {
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        seen.unobserve(stat);
        const end = parseInt(stat.textContent, 10) || 10;
        const dur = 900, t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          stat.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    seen.observe(stat);
  }
})();
