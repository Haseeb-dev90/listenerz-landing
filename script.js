(() => {
  'use strict';

  const LINES = [
    'Hi, I’m your ListenerZ host.',
    'Sometimes, being heard is where relief begins.',
    'ListenerZ connects you with a real person who just listens.',
    'Your avatar and digitized voice help protect your identity.',
    'You pay only for the minutes you use.',
    'Need more? ListenerZ Pro books verified, licensed therapists.',
    'Talk when you’re ready. Be heard when it matters.'
  ];
  const STEP_MS = 4500;
  const IDLE_CAPTION = 'Press play to begin';

  const $ = (id) => document.getElementById(id);
  const stage = $('videoStage');
  const caption = $('caption');
  const button = $('playButton');
  const status = $('videoStatus');
  const bar = $('progressBar');
  if (!stage || !button) return;

  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  let timer = 0;
  let index = 0;
  let playing = false;

  const setButton = (icon, label) => { button.innerHTML = `<span aria-hidden="true">${icon}</span> ${label}`; };

  function setCaption(text) {
    caption.classList.add('swap');
    window.setTimeout(() => { caption.textContent = text; caption.classList.remove('swap'); }, 200);
  }

  function speak(text) {
    setCaption(text);
    if (!synth) return;
    synth.cancel();
    synth.speak(new SpeechSynthesisUtterance(text));
  }

  function tick() {
    if (index >= LINES.length) return stop(true);
    speak(LINES[index]);
    index += 1;
    bar.style.transition = `width ${STEP_MS}ms linear`;
    bar.style.width = `${(index / LINES.length) * 100}%`;
    timer = window.setTimeout(tick, STEP_MS);
  }

  function start() {
    playing = true;
    stage.classList.add('speaking');
    button.setAttribute('aria-pressed', 'true');
    setButton('❚❚', 'Pause');
    status.textContent = 'Playing';
    tick();
  }

  function stop(finished = false) {
    window.clearTimeout(timer);
    if (synth) synth.cancel();
    playing = false;
    index = 0;
    stage.classList.remove('speaking');
    button.setAttribute('aria-pressed', 'false');
    bar.style.transition = 'none';
    bar.style.width = finished ? '100%' : '0';
    setButton('▶', finished ? 'Replay introduction' : 'Play introduction');
    status.textContent = finished ? 'Finished' : 'Ready to play';
    caption.textContent = IDLE_CAPTION;
  }

  button.addEventListener('click', () => (playing ? stop() : start()));
  window.addEventListener('pagehide', () => synth && synth.cancel());

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
