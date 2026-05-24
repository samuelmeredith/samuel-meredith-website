// Shared site behaviours: nav scroll state + reveal-on-scroll + mobile drawer
(function() {
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // Mobile nav drawer
  const navToggle  = document.getElementById('nav-toggle');
  const navDrawer  = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose   = document.getElementById('nav-close');

  if (navToggle && navDrawer) {
    const openMenu = () => {
      navDrawer.classList.add('open');
      if (navOverlay) navOverlay.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      navDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      navDrawer.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }
})();
