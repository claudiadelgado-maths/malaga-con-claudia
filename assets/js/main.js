/* Interacciones ligeras del prototipo. Sin dependencias externas. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("#primary-navigation");
  const toast = document.querySelector("[data-toast]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let toastTimer;
  let lastFocusedElement = null;

  function currentCopy() {
    const language = window.MalagaI18n?.language || "es";
    return window.MalagaI18n?.metadata?.[language] || window.MalagaI18n?.metadata?.es;
  }

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  let scrollFrame = null;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        updateHeader();
        scrollFrame = null;
      });
    },
    { passive: true }
  );
  updateHeader();

  function focusableMenuItems() {
    if (!navigation) return [];
    return Array.from(navigation.querySelectorAll('a[href], button:not([disabled])'));
  }

  function setMenu(open, returnFocus = true) {
    if (!menuButton || !navigation || !header) return;

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? currentCopy().closeMenu : window.MalagaI18n.dictionaries[window.MalagaI18n.language]["nav.openMenu"]);
    navigation.classList.toggle("is-open", open);
    header.classList.toggle("menu-active", open);
    document.body.classList.toggle("menu-open", open);

    if (open) {
      lastFocusedElement = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
        ? document.activeElement
        : menuButton;
      window.setTimeout(() => focusableMenuItems()[0]?.focus(), reducedMotion.matches ? 0 : 180);
    } else if (returnFocus && lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }

  menuButton?.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    const menuIsOpen = menuButton?.getAttribute("aria-expanded") === "true";
    if (!menuIsOpen) return;

    if (event.key === "Escape") {
      setMenu(false);
      return;
    }

    if (event.key === "Tab") {
      const items = focusableMenuItems();
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }
  });

  navigation?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => setMenu(false, false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120 && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false, false);
    }
  });

  window.addEventListener("languagechange", () => {
    if (menuButton?.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-label", currentCopy().closeMenu);
    }
  });

  /* Native details preserve keyboard and screen-reader behaviour; this makes the set act as an accordion. */
  const accordionItems = document.querySelectorAll("[data-accordion] details");
  accordionItems.forEach((item) => {
    item.querySelector("summary")?.addEventListener("click", () => {
      if (item.open) return;
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });

    item.addEventListener("toggle", () => {
      if (!item.open) return;
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });

  /* Active navigation state for the major destinations. */
  const navLinks = Array.from(document.querySelectorAll('.nav-panel > a[href^="#"]'));
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            if (isCurrent) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-30% 0px -62%", threshold: 0 }
    );
    navSections.forEach((section) => sectionObserver.observe(section));
  }

  /* Subtle reveal effects are progressive enhancement and are disabled for reduced motion. */
  const revealItems = document.querySelectorAll(".reveal");
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    revealItems.forEach((item) => item.classList.add("is-pending"));
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  function showPlaceholderMessage() {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = currentCopy().placeholder;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  }

  document.querySelectorAll("[data-placeholder-action]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPlaceholderMessage();
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
