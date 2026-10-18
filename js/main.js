/* Malki Bridal & Beauty — interactions (no dependencies) */
(function () {
  "use strict";

  var S = window.SITE;
  var B = S.business;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function waLink(message) {
    return B.whatsappUrl + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  /* ---------- Fine line icons ---------- */
  var ICONS = {
    dress: "M9 3l3 3 3-3 1 6-2 3 3 9H7l3-9-2-3z",
    scissors: "M6 4a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6 15a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM8 8l12 10M8 16L20 6",
    polish: "M9 11h6v9H9zM10 7h4v4h-4zM11 3h2v4h-2z",
    leaf: "M12 21c-5-3-7-8-7-12 4 0 7 3 7 7 0-4 3-7 7-7 0 4-2 9-7 12z",
    sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
    gem: "M6 4h12l4 6-10 11L2 10zM2 10h20M9 4l3 6 3-6M12 10v11"
  };
  function icon(name) {
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "menu-icon");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", ICONS[name] || ICONS.sparkle);
    svg.appendChild(p);
    return svg;
  }

  /* ---------- WhatsApp links (all data-wa anchors) ---------- */
  $$("a[data-wa]").forEach(function (a) {
    a.href = waLink("Hello Malki Bridal & Beauty, I would like to enquire about an appointment.");
  });

  /* ---------- Render bridal ---------- */
  var bridalGrid = $("#bridal-grid");
  S.bridal.forEach(function (b, i) {
    var item = el("article", { "class": "b-item b-" + b.layout + " reveal" });
    var wrap = el("div", { "class": "b-img" });
    var img = el("img", { src: b.img, alt: b.alt, loading: "lazy", width: "1000", height: "800" });
    wrap.appendChild(img);
    var link = el("a", { "class": "text-link", href: waLink("Hello Malki Bridal & Beauty, I would like to enquire about: " + b.title), target: "_blank", rel: "noopener" });
    link.appendChild(document.createTextNode("Enquire"));
    var hidden = el("span", { "class": "visually-hidden", text: " about " + b.title + " (opens WhatsApp in a new tab)" });
    link.appendChild(hidden);
    item.appendChild(wrap);
    item.appendChild(el("span", { "class": "b-index", text: "0" + (i + 1) }));
    item.appendChild(el("h3", { text: b.title }));
    item.appendChild(el("p", { text: b.text }));
    item.appendChild(link);
    bridalGrid.appendChild(item);
  });

  /* ---------- Render services + populate form select ---------- */
  var menu = $("#service-menu");
  var select = $("#f-service");
  S.services.forEach(function (s) {
    var li = el("li", { "class": "menu-item reveal" });
    li.appendChild(icon(s.icon));
    var body = el("div");
    body.appendChild(el("h3", { text: s.title }));
    body.appendChild(el("p", { text: s.text }));
    li.appendChild(body);
    if (s.price) {
      li.appendChild(el("span", { "class": "menu-price", text: s.price }));
    } else {
      var a = el("a", { "class": "menu-link", href: "#enquire", "data-service": s.title });
      a.appendChild(document.createTextNode("Enquire"));
      a.appendChild(el("span", { "class": "visually-hidden", text: " about " + s.title }));
      li.appendChild(a);
    }
    menu.appendChild(li);
    select.appendChild(el("option", { value: s.title, text: s.title }));
  });
  select.appendChild(el("option", { value: "Not sure yet", text: "Not sure yet — I would like advice" }));

  $$(".menu-link").forEach(function (a) {
    a.addEventListener("click", function () { select.value = a.getAttribute("data-service"); clearError(select); });
  });

  /* ---------- Gallery + filters ---------- */
  var grid = $("#gallery-grid");
  var filtersEl = $("#gallery-filters");
  var galleryItems = [];

  S.gallery.forEach(function (g, i) {
    var wrap = el("div", { "class": "g-item reveal", "data-cat": g.cat });
    var btn = el("button", { type: "button", "class": "g-btn", "data-cat": g.cat, "aria-label": "Enlarge image: " + g.alt });
    btn.style.aspectRatio = g.ratio;
    btn.appendChild(el("img", { src: g.src, alt: g.alt, loading: "lazy", decoding: "async" }));
    btn.addEventListener("click", function () { openLightbox(i, btn); });
    wrap.appendChild(btn);
    grid.appendChild(wrap);
    galleryItems.push({ node: wrap, data: g });
  });

  var present = S.galleryCategoryOrder.filter(function (c) {
    return S.gallery.some(function (g) { return g.cat === c; });
  });
  ["All"].concat(present).forEach(function (c, idx) {
    var b = el("button", { type: "button", "class": "filter-btn", "aria-pressed": idx === 0 ? "true" : "false", text: c });
    b.addEventListener("click", function () {
      $$(".filter-btn", filtersEl).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      galleryItems.forEach(function (it) {
        it.node.hidden = !(c === "All" || it.data.cat === c);
        it.node.classList.add("in");
      });
    });
    filtersEl.appendChild(b);
  });

  /* ---------- Lightbox (native <dialog>: focus trap + Escape built in) ---------- */
  var lb = $("#lightbox");
  var lbImg = $("#lb-img");
  var lbCap = $("#lb-cap");
  var lbIndex = 0;
  var lbReturn = null;

  function visibleIndexes() {
    var out = [];
    galleryItems.forEach(function (it, i) { if (!it.node.hidden) out.push(i); });
    return out;
  }
  function showLb(i) {
    lbIndex = i;
    var d = galleryItems[i].data;
    lbImg.src = d.src;
    lbImg.alt = d.alt;
    lbCap.textContent = d.cat + " — " + d.alt;
  }
  function openLightbox(i, trigger) {
    lbReturn = trigger;
    showLb(i);
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
    $(".lb-close", lb).focus();
  }
  function step(dir) {
    var vis = visibleIndexes();
    var pos = vis.indexOf(lbIndex);
    showLb(vis[(pos + dir + vis.length) % vis.length]);
  }
  function closeLb() {
    if (typeof lb.close === "function") lb.close(); else lb.removeAttribute("open");
  }
  $(".lb-close", lb).addEventListener("click", closeLb);
  $(".lb-prev", lb).addEventListener("click", function () { step(-1); });
  $(".lb-next", lb).addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  lb.addEventListener("close", function () { if (lbReturn) lbReturn.focus(); });

  /* ---------- Header: scroll state + mobile menu ---------- */
  var header = $(".site-header");
  var toggle = $(".menu-toggle");
  var nav = $("#main-nav");

  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  var mq = window.matchMedia("(max-width: 1020px)");
  function syncNavA11y() {
    if (mq.matches) { nav.setAttribute("aria-hidden", String(!nav.classList.contains("open"))); if (!nav.classList.contains("open")) nav.setAttribute("inert", ""); }
    else { nav.removeAttribute("aria-hidden"); nav.removeAttribute("inert"); setMenu(false); }
  }
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    setMenu(open);
    if (open) nav.removeAttribute("inert");
    syncNavA11y();
    if (open) { var first = $("a", nav); if (first) first.focus(); }
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { if (mq.matches) { setMenu(false); syncNavA11y(); } }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); syncNavA11y(); toggle.focus(); }
    /* keep keyboard focus inside the open mobile menu */
    if (e.key === "Tab" && toggle.getAttribute("aria-expanded") === "true") {
      var f = [toggle].concat($$("a", nav));
      var idx = f.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && idx === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  if (mq.addEventListener) mq.addEventListener("change", syncNavA11y); else mq.addListener(syncNavA11y);
  syncNavA11y();

  /* ---------- Active nav link ---------- */
  var navLinks = $$("[data-nav]");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (n) { n.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Gentle hero parallax ---------- */
  var para = $(".parallax");
  if (para && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        para.style.transform = "translate3d(0," + (y * 0.06).toFixed(1) + "px,0) scale(1.06)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Enquiry form -> prefilled WhatsApp message ---------- */
  var form = $("#enquiry-form");
  var status = $("#form-status");
  var dateInput = $("#f-date");

  (function setMinDate() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    dateInput.min = d.getFullYear() + "-" + m + "-" + day;
  })();

  function errorEl(input) { return $("#" + input.getAttribute("aria-describedby")); }
  function setError(input, msg) {
    var field = input.closest(".field");
    field.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl(input).textContent = msg;
  }
  function clearError(input) {
    var field = input.closest(".field");
    field.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    var e = input.getAttribute("aria-describedby") && errorEl(input);
    if (e) e.textContent = "";
  }

  function validate() {
    var ok = true, firstBad = null;
    var f = form.elements;
    function bad(input, msg) { setError(input, msg); ok = false; if (!firstBad) firstBad = input; }
    ["name", "service", "date", "time"].forEach(function (k) { clearError(f[k]); });

    if (!f.name.value.trim()) bad(f.name, "Please enter your full name.");
    if (!f.service.value) bad(f.service, "Please choose the service you are interested in.");
    if (!f.date.value) bad(f.date, "Please choose your preferred date.");
    else if (f.date.min && f.date.value < f.date.min) bad(f.date, "Please choose today or a future date.");
    if (!f.time.value) bad(f.time, "Please choose your preferred time.");
    if (firstBad) firstBad.focus();
    return ok;
  }

  ["name", "service", "date", "time"].forEach(function (k) {
    var input = form.elements[k];
    input.addEventListener("input", function () { clearError(input); });
    input.addEventListener("change", function () { clearError(input); });
  });

  function formatDate(iso) {
    var p = iso.split("-");
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  function formatTime(t) {
    var p = t.split(":");
    var h = Number(p[0]);
    var ampm = h >= 12 ? "PM" : "AM";
    return ((h + 11) % 12 + 1) + ":" + p[1] + " " + ampm;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var f = form.elements;
    var lines = [
      "Hello Malki Bridal & Beauty, I would like to enquire about an appointment.",
      "",
      "Name: " + f.name.value.trim(),
      f.phone.value.trim() ? "WhatsApp number: " + f.phone.value.trim() : null,
      "Service: " + f.service.value,
      "Preferred date: " + formatDate(f.date.value),
      "Preferred time: " + formatTime(f.time.value),
      f.occasion.value.trim() ? "Occasion: " + f.occasion.value.trim() : null,
      f.message.value.trim() ? "Message: " + f.message.value.trim() : null,
      "",
      "Please let me know about availability and the advance-payment steps. Thank you."
    ].filter(function (l) { return l !== null; });
    var url = waLink(lines.join("\n"));

    status.hidden = false;
    status.textContent = "";
    status.appendChild(el("strong", { text: "Your WhatsApp message is ready." }));
    status.appendChild(document.createElement("br"));
    status.appendChild(document.createTextNode("Press send in WhatsApp to deliver your enquiry. Your appointment is not confirmed until the salon confirms availability and advance payment."));
    var again = el("a", { "class": "btn btn-ghost", href: url, target: "_blank", rel: "noopener", text: "Open WhatsApp" });
    status.appendChild(document.createElement("br"));
    status.appendChild(again);

    /* Open WhatsApp in a new tab. If a pop-up blocker stops it, the link in the
       confirmation panel above still opens the prefilled message. */
    var opener = document.createElement("a");
    opener.href = url;
    opener.target = "_blank";
    opener.rel = "noopener";
    document.body.appendChild(opener);
    opener.click();
    document.body.removeChild(opener);
    status.focus();
  });
})();
