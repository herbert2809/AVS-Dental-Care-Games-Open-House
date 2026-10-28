let total = 180, left = 180, endAt = 0, running = false, raf = 0, lastWhole = -1;
function show() {
  const s = Math.max(0, Math.ceil(left)), m = Math.floor(s / 60);
  $('#time').textContent = left <= 0 ? "Time's up!" : `${m}:${String(s % 60).padStart(2, '0')}`;
  $('#time').style.fontSize = left <= 0 ? 'clamp(48px,18vmin,240px)' : '';
  $('#time').classList.toggle('low', left > 0 && left <= 10); $('#time').classList.toggle('up', left <= 0);
  $('#fill').style.width = `${Math.max(0, left / total) * 100}%`;
  $('#start').textContent = running ? 'Pause' : (left < total && left > 0 ? 'Go on' : 'Start');
  if (running && s !== lastWhole && s <= 10 && s > 0) sfx.tick();
  lastWhole = s;
}
function frame() {
  if (!running) return;
  left = (endAt - Date.now()) / 1000;
  if (left <= 0) { left = 0; running = false; show(); sfx.win(); return; }
  show(); raf = requestAnimationFrame(frame);
}
$('#start').onclick = () => {
  if (left <= 0) return;
  running = !running; if (running) { endAt = Date.now() + left * 1000; sfx.tap(); raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf);
  show();
};
function setTotal(sec) { running = false; cancelAnimationFrame(raf); total = Math.min(900, Math.max(60, sec)); left = total; show(); }
$('#minus').onclick = () => setTotal(total - 60); $('#plus').onclick = () => setTotal(total + 60); $('#reset').onclick = () => setTotal(total);
show();
