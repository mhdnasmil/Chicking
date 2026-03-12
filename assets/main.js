document.addEventListener("DOMContentLoaded", () => {

  // ─────────────────────────────────────────────
  // 1. Find whichever nav collapse exists on this page
  //    (index = #mainNav, career = #careerNav, menu = #menuNav)
  // ─────────────────────────────────────────────
  const navEl = document.querySelector("#mainNav, #careerNav, #menuNav");
  const toggleBtn = navEl
    ? document.querySelector(`[data-bs-target="#${navEl.id}"]`)
    : null;

  // Bootstrap Collapse instance
  const bsCollapse = navEl
    ? new bootstrap.Collapse(navEl, { toggle: false })
    : null;

  // ─────────────────────────────────────────────
  // 2. Close menu when any nav-link is clicked
  //    (handles anchor links like #about, #menu, #contact)
  // ─────────────────────────────────────────────
  if (navEl) {
    navEl.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  // ─────────────────────────────────────────────
  // 3. Close menu when clicking outside of it
  // ─────────────────────────────────────────────
  document.addEventListener("click", (e) => {
    if (!navEl) return;
    if (
      navEl.classList.contains("show") &&
      !navEl.contains(e.target) &&
      toggleBtn && !toggleBtn.contains(e.target)
    ) {
      bsCollapse.hide();
    }
  });

  // ─────────────────────────────────────────────
  // 4. Swap hamburger icon ☰ ↔ ✕ on toggle
  // ─────────────────────────────────────────────
  if (navEl && toggleBtn) {
    navEl.addEventListener("show.bs.collapse", () => {
      toggleBtn.innerHTML = "&#10005;"; // ✕
    });
    navEl.addEventListener("hide.bs.collapse", () => {
      toggleBtn.innerHTML = "&#9776;"; // ☰
    });
  }

  // ─────────────────────────────────────────────
  // 5. Active nav highlight on scroll (index.html only)
  //    Skips gracefully on pages with no sections.
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    const onScroll = () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href") || "";
        if (current && href.includes(current)) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

});