/* ============================================================
   THE GUEST EXPERIENCE SUMMIT — SHARED SITE JS
   Lightweight, dependency-free. Progressively enhances
   filters, accordions, tabs and forms across all pages.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Filter chip toggling (Agenda / Speakers / Insights) ---------- */
  document.querySelectorAll('.filter-bar').forEach(function (bar) {
    var chips = bar.querySelectorAll('.filter-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
      });
    });
  });

  /* ---------- Day tabs (Agenda page) ---------- */
  document.querySelectorAll('.day-tabs').forEach(function (tabBar) {
    var tabs = tabBar.querySelectorAll('.day-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      });
    });
  });

  /* ---------- FAQ accordion (Contact / Request Invitation) ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (!question || !answer) return;

    // Collapsed by default, first item open
    answer.style.display = item.classList.contains('open') ? 'block' : 'none';

    question.addEventListener('click', function () {
      var isOpen = answer.style.display === 'block';
      answer.style.display = isOpen ? 'none' : 'block';
      var marker = question.querySelector('span');
      if (marker) marker.textContent = isOpen ? '+' : '−';
    });
  });

  /* ---------- Radio pill groups (Request Invitation form) ---------- */
  document.querySelectorAll('.radio-group').forEach(function (group) {
    var pills = group.querySelectorAll('.radio-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('selected'); });
        pill.classList.add('selected');
      });
    });
  });

  /* ---------- Generic form submit handling (prevents real navigation in this static handoff) ---------- */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"], button:not([type])');
      if (submitBtn) {
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitted ✓';
        submitBtn.disabled = true;
        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2500);
      }
      // In production: POST to the relevant API route
      // (/api/invitations, /api/contact, /api/partner-leads, /api/newsletter)
      console.log('[form submit - static demo]', new FormData(form));
    });
  });

  /* ---------- Mobile nav toggle (if a .nav-toggle button is present) ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nav-open');
    });
  }

  /* ---------- Smooth scroll for in-page anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

});
