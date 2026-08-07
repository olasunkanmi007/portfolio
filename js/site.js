/* Hamed Abdulsalam, UX Portfolio
   Shared chrome: nav + footer injection, mobile menu, header shadow, in-page scrollspy.
   No external dependencies, no build step. Works from file:// or any static host. */
(function () {
  var ROOT = window.SITE_ROOT || "./";
  var PAGE = document.body.getAttribute("data-page") || "";

  var NAV_LINKS = [
    { href: "work.html", label: "Work", page: "work" },
    { href: "approach.html", label: "Approach", page: "approach" },
    { href: "about.html", label: "About", page: "about" },
    { href: "leadership.html", label: "Leadership", page: "leadership" }
  ];

  function navHTML() {
    var links = NAV_LINKS.map(function (l) {
      var current = l.page === PAGE ? ' aria-current="page"' : "";
      return '<li><a href="' + ROOT + l.href + '"' + current + ">" + l.label + "</a></li>";
    }).join("");

    return (
      '<div class="shell nav-row">' +
        '<a class="logo" href="' + ROOT + 'index.html"' + (PAGE === "home" ? ' aria-current="page"' : "") + ">Hamed Abdulsalam</a>" +
        '<nav class="nav-primary" aria-label="Primary">' +
          '<ul class="nav-links" id="nav-links">' + links + "</ul>" +
          '<div class="nav-actions">' +
            '<a class="link-arrow" href="mailto:hamedleyesalam@gmail.com">Let\'s Connect! <span class="a" aria-hidden="true">→</span></a>' +
            '<div class="a11y-control">' +
              '<button class="a11y-toggle" id="a11y-toggle" aria-expanded="false" aria-controls="a11y-panel" aria-label="Reading preferences: text size and contrast">Aa</button>' +
              '<div class="a11y-panel" id="a11y-panel" role="group" aria-label="Reading preferences" hidden>' +
                '<p class="a11y-panel-title">Reading preferences</p>' +
                '<div class="a11y-row">' +
                  '<span>Text size</span>' +
                  '<div class="a11y-size-steps" role="group" aria-label="Text size">' +
                    '<button type="button" class="a11y-size-btn" data-size="md" aria-label="Default text size">A</button>' +
                    '<button type="button" class="a11y-size-btn" data-size="lg" aria-label="Large text size">A</button>' +
                    '<button type="button" class="a11y-size-btn" data-size="xl" aria-label="Largest text size">A</button>' +
                  "</div>" +
                "</div>" +
                '<label class="a11y-row a11y-switch-row">' +
                  "<span>High contrast</span>" +
                  '<span class="a11y-switch"><input type="checkbox" id="a11y-contrast-toggle"><span class="a11y-switch-track" aria-hidden="true"></span></span>' +
                "</label>" +
              "</div>" +
            "</div>" +
            '<button class="theme-toggle" id="theme-toggle" aria-label="Switch to dark theme" aria-pressed="false">' +
              '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
              '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
            "</button>" +
            '<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links">' +
              '<span class="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>' +
              '<span class="nav-toggle-label">Menu</span>' +
            "</button>" +
          "</div>" +
        "</nav>" +
      "</div>"
    );
  }

  function footerHTML() {
    var year = new Date().getFullYear();
    return (
      '<div class="shell footer-row">' +
        '<p class="footer-meta">&copy; ' + year + ' Hamed Abdulsalam, UX Researcher &amp; Designer, USA 🇺🇸.</p>' +
        '<nav aria-label="Footer">' +
          "<ul>" +
            '<li><a href="' + ROOT + 'work.html">Work</a></li>' +
            '<li><a href="' + ROOT + 'approach.html">Approach</a></li>' +
            '<li><a href="' + ROOT + 'about.html">About</a></li>' +
            '<li><a href="' + ROOT + 'leadership.html">Leadership</a></li>' +
            '<li><a href="mailto:hamedleyesalam@gmail.com">Contact</a></li>' +
          "</ul>" +
        "</nav>" +
      "</div>"
    );
  }

  function mountChrome() {
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.innerHTML = navHTML();
    if (footerMount) footerMount.innerHTML = footerHTML();
  }

  function mountLetterButton() {
    if (PAGE === "about" || PAGE === "404") return;
    var region = document.createElement("div");
    region.setAttribute("role", "complementary");
    region.setAttribute("aria-label", "Letter to my next team shortcut");
    var a = document.createElement("a");
    a.className = "letter-fab";
    a.href = ROOT + "about.html#letter";
    a.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>' +
      "<span>A Letter to My Next Team</span>";
    region.appendChild(a);
    document.body.appendChild(region);

    var revealAt = 320;
    function onScroll() {
      a.classList.toggle("is-visible", window.scrollY > revealAt);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function wireMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;
    var label = toggle.querySelector(".nav-toggle-label");

    function close() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (label) label.textContent = "Menu";
    }
    function open() {
      links.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (label) label.textContent = "Close";
    }
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("is-open");
      isOpen ? close() : open();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var next = theme === "dark" ? "light" : "dark";
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", "Switch to " + next + " theme");
    }
    var meta = document.getElementById("theme-color-meta");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#15130F" : "#FCFAF6");
  }

  function wireThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    setTheme(currentTheme());
    btn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  function wireA11yPanel() {
    var toggle = document.getElementById("a11y-toggle");
    var panel = document.getElementById("a11y-panel");
    var sizeBtns = panel ? panel.querySelectorAll(".a11y-size-btn") : [];
    var contrastCheckbox = document.getElementById("a11y-contrast-toggle");
    if (!toggle || !panel) return;

    function applyTextSize(size) {
      document.documentElement.setAttribute("data-text-size", size);
      try { localStorage.setItem("textSize", size); } catch (e) {}
      sizeBtns.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-size") === size ? "true" : "false");
      });
    }

    function applyContrast(on) {
      if (on) document.documentElement.setAttribute("data-contrast", "high");
      else document.documentElement.removeAttribute("data-contrast");
      try { localStorage.setItem("contrast", on ? "high" : ""); } catch (e) {}
      if (contrastCheckbox) contrastCheckbox.checked = on;
    }

    var storedSize = "md";
    var storedContrast = false;
    try {
      storedSize = localStorage.getItem("textSize") || "md";
      storedContrast = localStorage.getItem("contrast") === "high";
    } catch (e) {}
    applyTextSize(storedSize);
    applyContrast(storedContrast);

    sizeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () { applyTextSize(btn.getAttribute("data-size")); });
    });
    if (contrastCheckbox) {
      contrastCheckbox.addEventListener("change", function () { applyContrast(contrastCheckbox.checked); });
    }

    function closePanel() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
    function openPanel() {
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function () {
      panel.hidden ? openPanel() : closePanel();
    });
    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== toggle) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        closePanel();
        toggle.focus();
      }
    });
  }

  function wireHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function wireScrollspy() {
    var nav = document.querySelector(".cs-nav");
    if (!nav || !("IntersectionObserver" in window)) return;
    var links = nav.querySelectorAll("a[href^='#']");
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { map[id] = a; targets.push(el); }
    });
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (a) { a.removeAttribute("aria-current"); });
            var a = map[entry.target.id];
            if (a) a.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    targets.forEach(function (t) { obs.observe(t); });
  }

  function alignHeroVisual() {
    var h1 = document.querySelector(".hero h1");
    var industries = document.querySelector(".hero .hero-industries");
    var wrap = document.querySelector(".hero-visual-wrap");
    var main = document.querySelector(".hero-main");
    if (!h1 || !wrap || !main) return;
    if (window.innerWidth <= 900) {
      wrap.style.marginTop = "";
      wrap.style.height = "";
      return;
    }
    var h1Rect = h1.getBoundingClientRect();
    var mainRect = main.getBoundingClientRect();
    var bottom = industries ? industries.getBoundingClientRect().bottom : h1Rect.bottom;
    wrap.style.marginTop = Math.max(0, h1Rect.top - mainRect.top) + "px";
    wrap.style.height = Math.max(0, bottom - h1Rect.top) + "px";
  }

  function wireHeroVisual() {
    if (!document.querySelector(".hero-visual")) return;
    alignHeroVisual();
    var raf = null;
    window.addEventListener("resize", function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(alignHeroVisual);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignHeroVisual);
    }
  }

  function wireHeroSlides() {
    var track = document.getElementById("hero-visual-track");
    var label = document.getElementById("hero-tag-label");
    var toggle = document.getElementById("hero-visual-toggle");
    if (!track) return;
    var slides = track.querySelectorAll(".hero-visual-slide");
    if (!slides.length) return;

    function setLabel(i) {
      var text = slides[i].getAttribute("data-label");
      if (label && text) label.textContent = text;
    }
    function setActive(i) {
      slides.forEach(function (slide, idx) {
        var active = idx === i;
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        slide.classList.toggle("is-active", active);
        var img = slide.querySelector("img");
        if (img) img.tabIndex = -1;
      });
    }
    setLabel(0);
    setActive(0);
    if (slides.length < 2) {
      if (toggle) toggle.style.display = "none";
      return;
    }

    var index = 0;
    var timer = null;
    var manuallyPaused = false;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(i) {
      setLabel(i);
      setActive(i);
    }
    function next() {
      index = (index + 1) % slides.length;
      show(index);
    }
    function start() {
      if (reduceMotion || timer || manuallyPaused) return;
      timer = setInterval(next, 5000);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }

    // Reduced motion already keeps this static, so there's nothing to pause.
    if (reduceMotion) {
      if (toggle) toggle.style.display = "none";
      return;
    }

    start();
    var visual = document.querySelector(".hero-visual");
    if (visual) {
      visual.addEventListener("mouseenter", stop);
      visual.addEventListener("mouseleave", function () {
        if (!manuallyPaused) start();
      });
      // Keyboard/AT users get the same pause-while-attending behavior as mouse hover (WCAG 2.2.2).
      visual.addEventListener("focusin", stop);
      visual.addEventListener("focusout", function (e) {
        if (!manuallyPaused && !visual.contains(e.relatedTarget)) start();
      });
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        manuallyPaused = !manuallyPaused;
        toggle.classList.toggle("is-paused", manuallyPaused);
        toggle.setAttribute("aria-label", manuallyPaused ? "Play slideshow" : "Pause slideshow");
        if (manuallyPaused) {
          stop();
        } else {
          start();
        }
      });
    }
  }

  function wireIndustryFilter() {
    var words = document.querySelectorAll(".industry-word");
    if (!words.length) return;
    var targets = document.querySelectorAll("[data-industries]");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function apply(key) {
      targets.forEach(function (t) {
        var list = (t.getAttribute("data-industries") || "").split(/\s+/);
        t.classList.toggle("is-industry-match", key !== null && list.indexOf(key) !== -1);
      });
    }

    var pinned = null;

    // Ambient spotlight: cycles the hover-style highlight through each word
    // on its own, so the row reads as "alive" without hiding any text (every
    // industry stays visible and scannable the whole time).
    var spotlightTimer = null;
    var spotlightIndex = -1;
    function clearSpotlight() {
      words.forEach(function (w) { w.classList.remove("is-spotlight"); });
    }
    function stepSpotlight() {
      clearSpotlight();
      spotlightIndex = (spotlightIndex + 1) % words.length;
      words[spotlightIndex].classList.add("is-spotlight");
    }
    function startSpotlight() {
      if (reduceMotion || spotlightTimer || pinned) return;
      stepSpotlight();
      spotlightTimer = setInterval(stepSpotlight, 2000);
    }
    function stopSpotlight() {
      clearInterval(spotlightTimer);
      spotlightTimer = null;
      clearSpotlight();
    }

    words.forEach(function (btn) {
      var key = btn.getAttribute("data-industry");
      btn.addEventListener("mouseenter", function () { stopSpotlight(); apply(key); });
      btn.addEventListener("mouseleave", function () { apply(pinned); if (!pinned) startSpotlight(); });
      btn.addEventListener("focus", function () { stopSpotlight(); apply(key); });
      btn.addEventListener("blur", function () { apply(pinned); if (!pinned) startSpotlight(); });
      btn.addEventListener("click", function () {
        var wasPinned = pinned === key;
        words.forEach(function (b) { b.classList.remove("is-active"); });
        pinned = wasPinned ? null : key;
        if (pinned) { btn.classList.add("is-active"); stopSpotlight(); }
        else { startSpotlight(); }
        apply(pinned);
      });
    });

    startSpotlight();
  }

  function wireIntroWave() {
    var el = document.getElementById("wave-intro");
    var burstRoot = document.getElementById("wave-burst");
    if (!el) return;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.remove();
      return;
    }

    var colors = ["var(--rust)", "var(--teal)", "var(--ochre)", "var(--plum)", "var(--accent)"];
    var points = [
      { x: "68%", y: "38%", count: 14 },
      { x: "84%", y: "62%", count: 12 },
      { x: "93%", y: "30%", count: 12 }
    ];

    if (burstRoot) {
      points.forEach(function (pt) {
        var fp = document.createElement("div");
        fp.className = "firework-point";
        fp.style.left = pt.x;
        fp.style.top = pt.y;
        for (var i = 0; i < pt.count; i++) {
          var particle = document.createElement("span");
          var angle = (360 / pt.count) * i;
          particle.style.setProperty("--angle", angle + "deg");
          particle.style.setProperty("--dist", (90 + Math.random() * 70) + "px");
          particle.style.background = colors[i % colors.length];
          fp.appendChild(particle);
        }
        burstRoot.appendChild(fp);
      });
    }

    var fireworkPoints = burstRoot ? burstRoot.querySelectorAll(".firework-point") : [];
    var burstStart = 1500;
    fireworkPoints.forEach(function (fp, i) {
      setTimeout(function () { fp.classList.add("is-active"); }, burstStart + i * 130);
    });

    setTimeout(function () {
      if (el.parentNode) el.remove();
    }, 2700);
  }

  function wireStatCounter() {
    var row = document.querySelector(".stat-row");
    var nums = row ? row.querySelectorAll(".num") : [];
    if (!row || !nums.length || !("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var items = [];
    nums.forEach(function (el) {
      var m = el.textContent.match(/^([^\d]*)([\d,]+)(.*)$/);
      if (!m) return;
      var target = parseInt(m[2].replace(/,/g, ""), 10);
      items.push({ el: el, prefix: m[1], target: target, suffix: m[3] });
      el.textContent = m[1] + "0" + m[3];
    });
    if (!items.length) return;

    function animate(item) {
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        item.el.textContent = item.prefix + Math.round(item.target * eased) + item.suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            items.forEach(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(row);
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountChrome();
    mountLetterButton();
    wireMobileMenu();
    wireThemeToggle();
    wireA11yPanel();
    wireHeaderShadow();
    wireScrollspy();
    wireHeroVisual();
    wireHeroSlides();
    wireIndustryFilter();
    wireIntroWave();
    wireStatCounter();
  });
})();
