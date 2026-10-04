// =============================================
// Samruddhi Mali — Shopify & E-commerce Developer
// Vanilla JS interactions
// =============================================
(function () {
  document.documentElement.classList.add('js');

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar background on scroll ---- */
  var nav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');
  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (nav) nav.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Close mobile menu after clicking a link ---- */
  var navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.querySelectorAll('a.nav-link, a.btn').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('show') && window.bootstrap) {
          var collapse = window.bootstrap.Collapse.getOrCreateInstance(navMenu);
          collapse.hide();
        }
      });
    });
  }

  /* ---- Scroll-reveal animations ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIO.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---- Duplicate tech strip for a seamless marquee loop ---- */
  var track = document.getElementById('techTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---- Contact form: opens a pre-filled email ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var projectType = form.projectType.value;
      var message = form.message.value.trim();

      var subject = encodeURIComponent('Project inquiry: ' + projectType);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Project type: ' + projectType + '\n\n' +
        message
      );
      window.location.href = 'mailto:samruddhimm13@gmail.com?subject=' + subject + '&body=' + body;

      var note = document.getElementById('formNote');
      if (note) note.textContent = 'Opening your email app now...';
    });
  }
})();
