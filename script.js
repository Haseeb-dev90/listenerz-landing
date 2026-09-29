const stage = document.getElementById('videoStage');
const caption = document.getElementById('caption');
const button = document.getElementById('playButton');
const status = document.getElementById('videoStatus');

const lines = [
  'Hi, I’m your ListenerZ host.',
  'Sometimes, being heard is where relief begins.',
  'ListenerZ connects you with a real person who just listens.',
  'Your avatar and digitized voice help protect your identity.',
  'You pay only for the minutes you use.',
  'Need more? ListenerZ Pro books verified, licensed therapists.',
  'Talk when you’re ready. Be heard when it matters.'
];
let timer = null, index = 0, playing = false;

function say(text) {
  caption.textContent = text;
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}

function next() {
  if (index >= lines.length) return stop(true);
  say(lines[index++]);
  timer = setTimeout(next, 4500);
}

function stop(finished) {
  clearTimeout(timer);
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  playing = false; index = 0;
  stage.classList.remove('speaking');
  button.innerHTML = '<span>▶</span> ' + (finished ? 'Replay introduction' : 'Play introduction');
  status.textContent = finished ? 'Finished' : 'Ready to play';
  caption.textContent = 'Press play to begin';
}

button.addEventListener('click', () => {
  if (playing) return stop(false);
  playing = true;
  stage.classList.add('speaking');
  button.innerHTML = '<span>❚❚</span> Pause';
  status.textContent = 'Playing';
  next();
});
