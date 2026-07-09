/* ATELIER HANNA — interactions (vanilla, sans dépendance) */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header : état au scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      header.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* ---------- Révélations au scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target); // joué une seule fois
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("[data-reveal],.stagger,.timeline,.notfound-list li").forEach(function (el) {
    io.observe(el);
  });

  /* ---------- Compteurs (chiffres clés) ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduced) { el.textContent = format(target); return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(function (el) { cio.observe(el); });

  /* ---------- Manifeste : texte qui s'encre ---------- */
  document.querySelectorAll("[data-ink]").forEach(function (block) {
    var words = block.textContent.trim().split(/\s+/);
    block.innerHTML = words.map(function (w) {
      return '<span class="ink-word">' + w + "</span>";
    }).join(" ");
    var spans = block.querySelectorAll(".ink-word");
    function inkScroll() {
      var r = block.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.7), 0), 1);
      var count = Math.floor(progress * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle("on", i < count); });
    }
    if (reduced) { spans.forEach(function (s) { s.classList.add("on"); }); return; }
    window.addEventListener("scroll", inkScroll, { passive: true });
    inkScroll();
  });

  /* ---------- Liste des métiers : media qui suit le curseur ---------- */
  var list = document.querySelector(".metier-list");
  var cm = document.querySelector(".cursor-media");
  if (list && cm && window.matchMedia("(hover:hover)").matches) {
    var ph = cm.querySelector(".ph");
    var lbl = cm.querySelector(".ph-label");
    list.addEventListener("mousemove", function (ev) {
      cm.style.transform = "translate(" + (ev.clientX + 32) + "px," + (ev.clientY - 100) + "px)";
    });
    list.addEventListener("mouseover", function (ev) {
      var li = ev.target.closest("li");
      if (!li) return;
      list.classList.add("hovering");
      cm.classList.add("on");
      ph.className = "ph " + (li.getAttribute("data-tone") || "t-etabli");
      lbl.textContent = li.getAttribute("data-label") || "";
    });
    list.addEventListener("mouseleave", function () {
      list.classList.remove("hovering");
      cm.classList.remove("on");
    });
  }

  /* ---------- Témoignages : rotation ---------- */
  document.querySelectorAll(".quotes").forEach(function (wrap) {
    var quotes = wrap.querySelectorAll(".quote");
    var dots = wrap.parentElement.querySelectorAll(".quote-dots button");
    if (!quotes.length) return;
    var i = 0, timer;
    function show(n) {
      i = n % quotes.length;
      quotes.forEach(function (q, k) { q.classList.toggle("on", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    }
    function auto() { timer = setInterval(function () { show(i + 1); }, 6000); }
    dots.forEach(function (d, k) {
      d.addEventListener("click", function () { clearInterval(timer); show(k); auto(); });
    });
    show(0);
    if (!reduced) auto();
  });

  /* ---------- Accordéon FAQ ---------- */
  document.querySelectorAll(".acc-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var body = item.querySelector(".acc-body");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0";
    });
  });

  /* ---------- Filtres galerie ---------- */
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      var cat = btn.getAttribute("data-filter");
      document.querySelectorAll(".gallery figure").forEach(function (f) {
        f.style.display = (cat === "all" || f.getAttribute("data-cat") === cat) ? "" : "none";
      });
    });
  }

  /* ---------- Formulaire de contact ----------
     Site statique : brancher l'attribut action du <form> sur
     Formspree / Basin / une Cloudflare Pages Function (cf. README). */
  var form = document.getElementById("contactForm");
  // Retour de la Pages Function (/api/contact) : afficher la confirmation.
  if (form && /[?&]ok=1\b/.test(window.location.search)) {
    form.style.display = "none";
    var okBox = document.getElementById("formConfirm");
    if (okBox) okBox.classList.add("on");
  }
  if (form) {
    form.addEventListener("submit", function (ev) {
      var email = form.querySelector("#f-email");
      var name = form.querySelector("#f-nom");
      var ok = true;
      [name, email].forEach(function (f) {
        var field = f.closest(".form-field");
        var valid = f.value.trim() !== "" && (f.id !== "f-email" || /.+@.+\..+/.test(f.value));
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { ev.preventDefault(); return; }
      // Si aucun endpoint n'est configuré, on simule la confirmation :
      if (!form.getAttribute("action") || form.getAttribute("action") === "#") {
        ev.preventDefault();
        form.style.display = "none";
        var confirm = document.getElementById("formConfirm");
        if (confirm) confirm.classList.add("on");
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
    });
  }

  /* ---------- Ancres actives (savoir-faire) ---------- */
  var anchorLinks = document.querySelectorAll(".anchor-nav a");
  if (anchorLinks.length) {
    var sections = Array.prototype.map.call(anchorLinks, function (a) {
      return document.querySelector(a.getAttribute("href"));
    });
    var aio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          anchorLinks.forEach(function (a) {
            a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { if (s) aio.observe(s); });
  }

  /* ---------- Année courante ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
