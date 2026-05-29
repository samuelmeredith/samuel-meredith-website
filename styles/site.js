// Shared site behaviours: nav scroll state + reveal-on-scroll + mobile drawer
(function() {

  // ---------- NAV SCROLL STATE ----------
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function() {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- REVEAL ON SCROLL ----------
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });

    // Staggered reveal for services list rows
    var svcList = document.querySelector('.svc-list');
    if (svcList) {
      var svcIo = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            svcList.querySelectorAll('.svc').forEach(function(item, i) {
              setTimeout(function() { item.classList.add('in'); }, i * 80);
            });
            svcIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });
      svcIo.observe(svcList);
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('in'); });
    document.querySelectorAll('.svc').forEach(function(el) { el.classList.add('in'); });
  }

  // ---------- MOBILE NAV DRAWER ----------
  var navToggle  = document.getElementById('nav-toggle');
  var navDrawer  = document.getElementById('nav-drawer');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose   = document.getElementById('nav-close');

  if (navToggle && navDrawer) {
    var openMenu = function() {
      navDrawer.classList.add('open');
      if (navOverlay) navOverlay.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      navDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    var closeMenu = function() {
      navDrawer.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMenu(); });
  }

})();
