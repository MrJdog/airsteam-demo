(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Highlight current page in nav ---------- */
  var here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Auto-updating year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Opening hours: single source of truth ---------- */
  // 0 = Sunday ... 6 = Saturday, matches Date#getDay()
  var HOURS = [
    { day: 0, label: "Søndag", opens: null, closes: null },
    { day: 1, label: "Mandag", opens: "09:00", closes: "17:00" },
    { day: 2, label: "Tirsdag", opens: "09:00", closes: "17:00" },
    { day: 3, label: "Onsdag", opens: "09:00", closes: "17:00" },
    { day: 4, label: "Torsdag", opens: "09:00", closes: "17:00" },
    { day: 5, label: "Fredag", opens: "09:00", closes: "17:00" },
    { day: 6, label: "Lørdag", opens: "10:00", closes: "14:00" }
  ];

  function copenhagenNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Copenhagen",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).formatToParts(new Date());

    var map = {};
    parts.forEach(function (p) {
      map[p.type] = p.value;
    });

    var weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[map.weekday];
    var hour = parseInt(map.hour, 10);
    var minute = parseInt(map.minute, 10);
    if (hour === 24) hour = 0;

    return { day: weekdayIndex, minutes: hour * 60 + minute };
  }

  function toMinutes(hhmm) {
    var bits = hhmm.split(":");
    return parseInt(bits[0], 10) * 60 + parseInt(bits[1], 10);
  }

  function getStatus() {
    var now = copenhagenNow();
    var today = HOURS[now.day];

    if (today.opens && now.minutes >= toMinutes(today.opens) && now.minutes < toMinutes(today.closes)) {
      return { open: true, text: "Åbent nu · Lukker " + today.closes };
    }

    for (var i = 0; i < 8; i++) {
      var idx = (now.day + i) % 7;
      var entry = HOURS[idx];
      if (!entry.opens) continue;
      if (i === 0 && now.minutes >= toMinutes(entry.closes)) continue;

      var when = i === 0 ? "kl. " + entry.opens : entry.label + " kl. " + entry.opens;
      return { open: false, text: "Lukket nu · Åbner " + when };
    }

    return { open: false, text: "Lukket nu" };
  }

  function renderStatusBadges() {
    var status = getStatus();
    document.querySelectorAll("[data-status-badge]").forEach(function (badge) {
      badge.classList.toggle("is-closed", !status.open);
      var textEl = badge.querySelector("[data-status-text]");
      if (textEl) textEl.textContent = status.text;
    });
  }

  function highlightTodayRow() {
    var now = copenhagenNow();
    document.querySelectorAll("[data-hours-table] tr").forEach(function (row) {
      var day = parseInt(row.getAttribute("data-day"), 10);
      row.setAttribute("data-today", day === now.day ? "true" : "false");
    });
  }

  renderStatusBadges();
  highlightTodayRow();
})();
