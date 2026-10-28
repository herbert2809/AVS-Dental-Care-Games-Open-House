// Shared engine: teacher model turn + four teams, sounds, finish screen.
const TEAMS = [
  { name: 'Red', color: 'var(--red)' }, { name: 'Blue', color: 'var(--blue)' },
  { name: 'Green', color: 'var(--green)' }, { name: 'Yellow', color: 'var(--yellow)' },
];
const TEACHER = { name: 'Teacher', color: 'var(--ink)' };
let turn = 0; // -1 = teacher's model round
const $ = (s, el) => (el || document).querySelector(s);
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
const who = (i) => (i < 0 ? TEACHER : TEAMS[i]);
// Points are kept by the teacher on the board, so the games show no scores.
function setTurn(i) { turn = i < 0 ? -1 : i % 4; document.dispatchEvent(new CustomEvent('turn')); }
function nextTurn() { setTurn(turn < 0 ? 0 : turn + 1); }
// Classes use groups 1-4 with no team names, so only the teacher's model turn shows a label.
function turnChip() { return turn < 0 ? `<span class="turn" style="--c:${TEACHER.color}">Teacher</span>` : ''; }

let AC;
function tone(freq, dur, type, when, gain) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type || 'sine'; o.frequency.value = freq; o.connect(g); g.connect(AC.destination);
    const t = AC.currentTime + (when || 0);
    g.gain.setValueAtTime(gain || 0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); o.stop(t + dur);
  } catch (e) { /* no sound available */ }
}
const sfx = {
  good() { tone(523, .15); tone(659, .15, 'sine', .12); tone(784, .3, 'sine', .24); },
  bad() { tone(196, .25, 'sawtooth', 0, .07); tone(147, .35, 'sawtooth', .18, .07); },
  tap() { tone(440, .07, 'triangle'); },
  tick() { tone(880, .05, 'square', 0, .05); },
  win() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, .25, 'triangle', i * .14)); },
};

function burst() {
  const box = el('<div class="stars"></div>');
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2, d = 25 + Math.random() * 30;
    const s = el(`<i style="left:50%;top:45%;--dx:${(Math.cos(a) * d).toFixed(0)}vmin;--dy:${(Math.sin(a) * d).toFixed(0)}vmin"><svg viewBox="0 0 200 200">${star(100, 100, 90)}</svg></i>`);
    box.appendChild(s);
  }
  $('#stage').appendChild(box); setTimeout(() => box.remove(), 1200);
}

function showFinish(title) {
  const o = el(`<div class="over"><div class="panel card finish"><h2>${title || 'Great job!'}</h2>
    <div style="display:flex;gap:2vmin"><button class="btn" id="finAgain">Play again</button><a class="btn go" href="index.html" style="text-decoration:none">All games</a></div></div></div>`);
  $('#stage').appendChild(o); $('#finAgain').onclick = () => location.reload(); sfx.win(); burst();
}

document.addEventListener('DOMContentLoaded', () => {
  const again = $('#btnAgain'); if (again) again.onclick = () => location.reload();
  const full = $('#btnFull'); if (full) full.onclick = () => {
    if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
  };
});
