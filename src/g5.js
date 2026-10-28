// Simple sentences only: I + action (no time phrases).
const TEACH = { k: 'brushA', line: 'I brush my teeth.' }; // tooth T: the teacher's model
const PICS = { candyA: 'I eat candy.', soda: 'I drink soda.', milk: 'I drink milk.', brushB: 'I brush my teeth.' };
const team = Object.keys(PICS);
for (let i = team.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = team[i]; team[i] = team[j]; team[j] = t; }
const keys = [TEACH.k].concat(team);
const lineOf = (i) => (i === 0 ? TEACH.line : PICS[keys[i]]);
const opened = keys.map(() => null); // null closed, otherwise who opened it (-1 teacher, 0-3 team)
let cur = -1;
turn = -1;
const TINT = ['#FFFFFF', '#FFE08A', '#BFE3FF', '#FFD0DC', '#C9F2D6'];
function draw() {
  $('#who').innerHTML = turnChip();
  $('#teeth').innerHTML = keys.map((k, i) => (opened[i] === null
    ? `<button class="lucky ${i === 0 ? 'teach' : ''}" data-i="${i}" aria-label="Tooth ${i === 0 ? 'T' : i}" ${(turn < 0) !== (i === 0) ? 'disabled' : ''}><svg class="art" viewBox="0 0 200 200">${toothShape(TINT[i])}</svg><span class="num">${i === 0 ? 'T' : i}</span></button>`
    : `<div class="lucky open"><svg class="art" viewBox="0 0 200 200">${toothShape('#FFFFFF')}</svg><span class="in">${art(k)}</span>
       ${opened[i] < 0 ? '<span class="turn tag" style="--c:var(--ink)">Teacher</span>' : ''}</div>`)).join('');
}
$('#teeth').addEventListener('click', (e) => {
  const b = e.target.closest('button.lucky'); if (!b || b.disabled) return;
  cur = +b.dataset.i; sfx.good();
  $('#who2').innerHTML = turnChip(); $('#pic').innerHTML = art(keys[cur]);
  $('#hint').innerHTML = `Say: ${lineOf(cur).split(' ').slice(0, 2).join(' ')} <b>…</b>`; $('#line').innerHTML = '&nbsp;';
  $('#qv').classList.remove('hidden');
});
$('#show').onclick = () => { $('#line').textContent = lineOf(cur); };
$('#give').onclick = () => {
  sfx.good(); burst();
  opened[cur] = turn; $('#qv').classList.add('hidden');
  if (opened.every((o) => o !== null)) { draw(); showFinish('Great job!'); } else { nextTurn(); draw(); }
};
draw();
