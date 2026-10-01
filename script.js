(() => {
  'use strict';

  // Scroll-reveal for sections (content stays visible if JS or IntersectionObserver is unavailable).
  document.documentElement.classList.add('js');
  const targets = document.querySelectorAll('.features, .steps, .about, .pro, .cta, .video-card, .hero-copy');
  targets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('in'));
  }
})();
