/* ═══════════════════════════════════════════
   THE DRACO CODEX — Interactive Script
   ═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initPressStart();
  initNavigation();
  initScrollReveal();
  initScrollProgress();
  initDragonCards();
  initMatchupChart();
  initStoryAccordion();
  initGlossary();
});

/* ═══════════════════════════════════════════
   TWINKLING STARS
   ═══════════════════════════════════════════ */
function initStars() {
  const container = document.getElementById("stars");
  if (!container) return;

  const colors = ["#fff", "#FFD700", "#87CEEB", "#FFB347", "#fff", "#fff"];
  const count = 250;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const r = Math.random();
    const isLarge = r < 0.12;  // ~12% are large sparkle stars
    const isMedium = !isLarge && r < 0.35;  // ~23% are medium

    star.className = isLarge ? "star star--lg" : "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", (2 + Math.random() * 4) + "s");
    star.style.setProperty("--delay", Math.random() * 5 + "s");
    star.style.setProperty("--brightness", (0.5 + Math.random() * 0.5).toString());
    star.style.setProperty("--star-color", colors[Math.floor(Math.random() * colors.length)]);

    const size = isLarge ? (Math.random() > 0.5 ? 5 : 4) : isMedium ? 3 : (Math.random() > 0.5 ? 2 : 1);
    star.style.width = size + "px";
    star.style.height = size + "px";
    container.appendChild(star);
  }
}

/* ═══════════════════════════════════════════
   PRESS START BUTTON
   ═══════════════════════════════════════════ */
function initPressStart() {
  const btn = document.getElementById("press-start");
  if (!btn) return;

  btn.addEventListener("click", () => {
    // Disable button immediately
    btn.disabled = true;
    btn.style.pointerEvents = "none";

    // 1. Flash the button bright gold
    btn.classList.add("press-start--activated");

    // 2. Burst stars outward from center
    const starsEl = document.getElementById("stars");
    if (starsEl) {
      starsEl.classList.add("stars--burst");
    }

    // 3. Create a bright flash overlay
    const flash = document.createElement("div");
    flash.className = "screen-flash";
    document.body.appendChild(flash);

    // 4. After flash peaks, zoom the title screen away
    setTimeout(() => {
      const titleScreen = document.getElementById("title-screen");
      if (titleScreen) {
        titleScreen.classList.add("title-screen--departing");
      }
    }, 400);

    // 5. Scroll to Chapter I after the drama
    setTimeout(() => {
      flash.remove();
      const target = document.getElementById("world");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 900);
  });
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
function initNavigation() {
  const nav = document.getElementById("main-nav");
  const tabs = document.querySelectorAll(".nav-tab");
  const sections = document.querySelectorAll(".codex-chapter");

  // Show/hide nav based on scroll past title screen
  const titleScreen = document.getElementById("title-screen");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.classList.remove("visible");
        } else {
          nav.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  if (titleScreen) {
    navObserver.observe(titleScreen);
  }

  // Active section highlighting
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabs.forEach((tab) => {
            tab.classList.remove("active");
            if (tab.getAttribute("href") === "#" + id) {
              tab.classList.add("active");
              // Apply element color to the underline
              const color = tab.dataset.color;
              tab.style.setProperty("color", "var(--text-light)");
              tab.style.setProperty("--tab-color", color);
              tab.querySelector("::after")?.style?.setProperty("background", color);
            }
          });

          // Update active tab underline color via CSS
          document.querySelectorAll(".nav-tab.active").forEach((t) => {
            t.style.setProperty("--underline-color", t.dataset.color);
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-60px 0px -40% 0px",
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Smooth scroll on click
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const href = tab.getAttribute("href");
      if (!href || !href.startsWith("#")) return; // let external links navigate normally
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 60; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Style active tab underline
  const style = document.createElement("style");
  style.textContent = `.nav-tab.active::after { background: var(--underline-color, var(--accent-gold)) !important; }`;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════
   SCROLL-TRIGGERED REVEAL (one-shot fade-in)
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════
   APPLE-STYLE SCROLL-PROGRESS ANIMATIONS
   Continuously linked to scroll position
   ═══════════════════════════════════════════ */
function initScrollProgress() {
  // Cache element references
  const sceneImages = document.querySelectorAll(".scene-image");
  const scrollZoomImages = document.querySelectorAll(".scroll-zoom");
  const chapterTitles = document.querySelectorAll(".chapter-title");
  const chapterHeaders = document.querySelectorAll(".chapter-header");
  const codexTitle = document.querySelector(".codex-title");
  const characterPortraits = document.querySelectorAll(".character-portrait img");
  const stars = document.querySelectorAll(".star");

  // Utility: get element's progress through viewport (0 = just entering bottom, 1 = exiting top)
  function getProgress(el) {
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    // 0 when bottom edge enters viewport, 1 when top edge exits viewport
    return (windowH - rect.top) / (windowH + rect.height);
  }

  // Utility: clamp value between 0 and 1
  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  // Utility: ease-out cubic
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    ticking = false;
    const windowH = window.innerHeight;

    // A) Enhanced parallax on scene images (±20px + slight rotation)
    // Only apply to non-zoom scene images (zoom images get their own treatment)
    sceneImages.forEach((img) => {
      if (img.classList.contains("scroll-zoom")) return; // handled below
      const rect = img.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = getProgress(img);
        const offset = (progress - 0.5) * 40; // ±20px
        const rotation = (progress - 0.5) * 2; // ±1deg
        img.style.transform = `translateY(${offset}px) rotate(${rotation}deg)`;
      }
    });

    // B) Scroll-zoom: images start at scale(1.05) and settle to scale(1.0)
    scrollZoomImages.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = clamp01(getProgress(img));
        const eased = easeOut(progress);
        const scale = 1.05 - 0.05 * eased;
        const rotation = (progress - 0.5) * 1.5; // subtle
        img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      }
    });

    // C) Chapter titles: scale from 0.85 → 1.0 tied to scroll
    chapterTitles.forEach((title) => {
      const rect = title.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        // Progress centered around when the title hits viewport center
        const centerProgress = clamp01((windowH - rect.top) / windowH);
        const eased = easeOut(centerProgress);
        const scale = 0.85 + 0.15 * eased;
        title.style.transform = `scale(${scale})`;
      }
    });

    // D) Chapter headers: slight upward float as they scroll
    chapterHeaders.forEach((header) => {
      const rect = header.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = clamp01(getProgress(header));
        const offset = (1 - progress) * 20;
        header.style.transform = `translateY(${offset}px)`;
      }
    });

    // E) Title screen codex-title: scale as user scrolls away
    if (codexTitle) {
      const rect = codexTitle.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = clamp01(rect.top / windowH);
        const scale = 0.9 + progress * 0.1;
        codexTitle.style.transform = `scale(${scale})`;
      }
    }

    // G) Character portraits: scale from 0.9 → 1.0 on scroll
    characterPortraits.forEach((portrait) => {
      const rect = portrait.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = clamp01(getProgress(portrait));
        const eased = easeOut(progress);
        const scale = 0.9 + 0.1 * eased;
        portrait.style.transform = `scale(${scale})`;
      }
    });

    // H) Stars parallax at different speeds
    if (stars.length > 0 && window.scrollY < windowH * 1.5) {
      const scrollFraction = window.scrollY / windowH;
      stars.forEach((star, i) => {
        const speed = 0.2 + (i % 3) * 0.15; // 3 different speed layers
        const offset = scrollFraction * speed * 50;
        star.style.transform = `translateY(${offset}px)`;
      });
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // Run once on load
  update();
}

/* ═══════════════════════════════════════════
   DRAGON CARD FLIP
   ═══════════════════════════════════════════ */
function initDragonCards() {
  const cards = document.querySelectorAll(".dragon-card");

  cards.forEach((card) => {
    // Toggle flip on click (for mobile)
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
}

/* ═══════════════════════════════════════════
   ELEMENT MATCHUP CHART
   ═══════════════════════════════════════════ */
function initMatchupChart() {
  const buttons = document.querySelectorAll(".matchup-btn");
  const result = document.getElementById("matchup-result");
  if (!result) return;

  const matchups = {
    fire: {
      strong: ["Grass", "Dragon Scale (armor)", "Shelled Enemies"],
      weak: ["Water"],
      notes: "Most common element. Devastatingly effective against shelled enemies (2 hits vs. 100).",
    },
    water: {
      strong: ["Fire"],
      weak: ["Grass"],
      notes: "Standard element with water-based powers.",
    },
    grass: {
      strong: ["Water", "Thunder Cloud"],
      weak: ["Fire"],
      notes: "Creates razor-leaf walls as obstacles. Key counter to the final boss Draco.",
    },
    electric: {
      strong: ["Power"],
      weak: [],
      notes: "Similar in nature to Thunder Cloud. Effective against Power dragons.",
    },
    psychic: {
      strong: [],
      weak: [],
      notes: "Telekinesis, making things vanish, unlocking doors. Does NOT read minds.",
    },
    spirit: {
      strong: [],
      weak: [],
      notes: "Sense truth, create illusions, knowledge-sharing beam. Silver Moonlight works only at night. NOT banned from races.",
    },
    speed: {
      strong: [],
      weak: [],
      notes: "270 mph top speed. BANNED from races due to overwhelming speed advantage.",
    },
    power: {
      strong: ["Has all element abilities (weaker versions)"],
      weak: ["Thunder Cloud", "Electric"],
      notes: "Rainbow element. Speed matches true Speed dragons. BANNED from races.",
    },
    thundercloud: {
      strong: ["Power"],
      weak: ["Grass"],
      notes: "Lightning feathers generate real thunder and lightning. Only obtainable by defeating Draco. Unlocks unknown time-restricted powers. Not all Thunder Cloud dragons have shells.",
    },
    universe: {
      strong: ["Shelled Enemies (one-hit crush)"],
      weak: [],
      notes: "Body bears a microscopic universe map with a tiny compass. Can crush shelled creatures in a single hit — unique among all elements.",
    },
    cosmic: {
      strong: ["Shelled Enemies (one-hit crush)"],
      weak: [],
      notes: "Looks like a map of space. Powers similar to Universe. Visually distinct: Cosmic = space map, Universe = compass.",
    },
    egg: {
      strong: ["All dragons (forces reset to egg)"],
      weak: [],
      notes: "Always carries an egg on top. Forces other dragons back inside their eggs — they forget ALL training and taming. A complete reset.",
    },
    spiritgrass: {
      strong: ["Thunder Cloud"],
      weak: ["Fire"],
      notes: "Spirit-Grass breed. Combines Spirit truth-sensing with Grass powers. Has 'Grass Spirit Army' attack (drains 10%). Tamed with a Breed Berry.",
    },
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active state
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const el = btn.dataset.el;
      const data = matchups[el];
      if (!data) return;

      let html = "";

      if (data.strong.length > 0) {
        html += `<p class="strong-against">Strong against: <strong>${data.strong.join(", ")}</strong></p>`;
      }

      if (data.weak.length > 0) {
        html += `<p class="weak-against">Weak against: <strong>${data.weak.join(", ")}</strong></p>`;
      }

      if (!data.strong.length && !data.weak.length) {
        html += `<p class="strong-against">No direct elemental weaknesses/strengths in the core cycle.</p>`;
      }

      html += `<p class="matchup-notes">${data.notes}</p>`;

      result.innerHTML = html;

      // Animate in
      result.style.opacity = "0";
      result.style.transform = "translateY(10px)";
      requestAnimationFrame(() => {
        result.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        result.style.opacity = "1";
        result.style.transform = "translateY(0)";
      });
    });
  });
}

/* ═══════════════════════════════════════════
   STORY ACCORDION
   ═══════════════════════════════════════════ */
function initStoryAccordion() {
  const toggles = document.querySelectorAll(".story-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const item = toggle.parentElement;
      const isOpen = item.classList.contains("open");

      // Close all others
      document.querySelectorAll(".story-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
        }
      });

      // Toggle current
      item.classList.toggle("open", !isOpen);
    });
  });
}

/* ═══════════════════════════════════════════
   GLOSSARY SEARCH & FILTER
   ═══════════════════════════════════════════ */
function initGlossary() {
  const input = document.getElementById("glossary-search");
  const entries = document.querySelectorAll(".glossary-entry");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    entries.forEach((entry) => {
      const term = entry.dataset.term || "";
      const text = entry.textContent.toLowerCase();

      if (!query) {
        entry.classList.remove("hidden", "highlight");
        return;
      }

      if (text.includes(query) || term.includes(query)) {
        entry.classList.remove("hidden");
        entry.classList.add("highlight");
      } else {
        entry.classList.add("hidden");
        entry.classList.remove("highlight");
      }
    });
  });
}
