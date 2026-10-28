const SEGS = [
  { k: 'candyA', line: 'Eat candy.', hint: 'Eat', good: 0 }, // teacher's model round
  { k: 'brushB', line: 'Brush your teeth.', hint: 'Brush', good: 1 }, { k: 'sodaB', line: 'Drink soda.', hint: 'Drink', good: 0 },
  { k: 'milkB', line: 'Drink milk.', hint: 'Drink', good: 1 }, { k: 'candyB', line: 'Eat candy.', hint: 'Eat', good: 0 },
  { k: 'brushA', line: 'I brush my teeth.', hint: 'I brush', good: 1 }, { k: 'soda', line: 'I drink soda.', hint: 'I drink', good: 0 },
  { k: 'milk', line: 'I drink milk.', hint: 'I drink', good: 1 }, { k: 'candyA', line: 'I eat candy.', hint: 'I eat', good: 0 },
];
const used = SEGS.map(() => false);
const CENTERS = [16.7, 50, 83.3]; // 3 x 3 bubbles cover the picture
let cur = -1, timer = null, popped = 0;
const NB = 9;
turn = -1;
function setButtons(on) { ['#show', '#yes'].forEach((s) => { $(s).disabled = !on; }); }
function clearBubbles() { document.querySelectorAll('.bub').forEach((b) => b.remove()); }
function idle() {
  clearTimeout(timer); clearBubbles();
  $('#who').innerHTML = turnChip(); $('#under').innerHTML = '<span class="qm">?</span>'; $('#line').innerHTML = '&nbsp;'; $('#hint').innerHTML = '';
  $('#s1').classList.remove('on'); $('#s2').classList.remove('on'); $('#bar').style.transition = 'none'; $('#bar').style.width = '0';
  setButtons(false); $('#reveal').disabled = true; $('#deal').classList.remove('hidden');
}
$('#deal').onclick = () => {
  const left = SEGS.map((s, i) => i).filter((i) => !used[i]); if (!left.length) return;
  cur = used[0] ? left[Math.floor(Math.random() * left.length)] : 0; popped = 0; sfx.tap();
  $('#under').innerHTML = art(SEGS[cur].k);
  clearBubbles();
  CENTERS.forEach((cy) => CENTERS.forEach((cx) => {
    const b = el('<button class="bub" aria-label="Pop the bubble"></button>');
    b.style.left = (cx - 21.5) + '%'; b.style.top = (cy - 21.5) + '%'; b.onclick = () => pop(b);
    $('#board').appendChild(b);
  }));
  $('#deal').classList.add('hidden'); $('#reveal').disabled = false;
};
function pop(b) {
  if (b.classList.contains('gone')) return;
  b.classList.add('gone'); tone(520 + Math.random() * 380, .09, 'triangle', 0, .14);
  if (++popped === NB) pictureReady();
}
function pictureReady() {
  $('#reveal').disabled = true; sfx.good();
  const u = $('#under'); u.classList.remove('pulse'); void u.offsetWidth; u.classList.add('pulse');
  setButtons(true); $('#s1').classList.add('on');
  $('#hint').innerHTML = `Say: ${SEGS[cur].hint} <b>…</b>`;
  const bar = $('#bar'); bar.style.transition = 'none'; bar.style.width = '0'; void bar.offsetWidth; bar.style.transition = 'width 10s linear'; bar.style.width = '100%';
  clearTimeout(timer); timer = setTimeout(() => { $('#s1').classList.remove('on'); $('#s2').classList.add('on'); sfx.tap(); }, 10000);
}
$('#reveal').onclick = () => {
  $('#reveal').disabled = true;
  document.querySelectorAll('.bub:not(.gone)').forEach((b, i) => setTimeout(() => pop(b), i * 70));
};
$('#show').onclick = () => {
  const s = SEGS[cur]; if (!s) return;
  $('#line').innerHTML = `${s.line} <span class="${s.good ? 'goodc' : 'badc'}">${s.good ? 'Good!' : 'Bad!'}</span>`;
};
function finishRound() {
  if (cur < 0) return;
  clearTimeout(timer); sfx.good(); burst();
  used[cur] = true; cur = -1;
  if (used.every(Boolean)) { setButtons(false); clearBubbles(); showFinish('Super speaking!'); } else { nextTurn(); idle(); }
}
$('#yes').onclick = finishRound;
idle();

