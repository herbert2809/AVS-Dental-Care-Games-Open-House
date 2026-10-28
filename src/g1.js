const TILES = [['candyA', 0], ['brushA', 1], ['soda', 0], ['milk', 1], ['sodaB', 0]];
turn = -1; // tile chosen by the teacher as a model
const done = TILES.map(() => false);
let cur = -1;
document.querySelectorAll('[data-art]').forEach((n) => { n.innerHTML = art(n.dataset.art); });
function draw() {
  $('#who').innerHTML = turnChip();
  $('#grid').innerHTML = TILES.map((t, i) => (done[i]
    ? `<div class="tile done ${t[1] ? 'g' : 'b'}">${art(t[0])}</div>`
    : `<button class="tile" data-i="${i}" aria-label="Tile ${i + 1}">${i + 1}</button>`)).join('');
}
$('#grid').addEventListener('click', (e) => {
  const b = e.target.closest('button.tile'); if (!b) return;
  cur = +b.dataset.i; sfx.tap();
  $('#pic').innerHTML = art(TILES[cur][0]); $('#who2').innerHTML = turnChip();
  $('#ans').classList.remove('hidden'); $('#res').classList.add('hidden'); $('#qtext').classList.remove('hidden');
  $('#qv').classList.remove('hidden');
});
$('#ans').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const good = TILES[cur][1] === 1, ok = (+b.dataset.v === 1) === good;
  $('#ans').classList.add('hidden'); $('#qtext').classList.add('hidden'); $('#res').classList.remove('hidden');
  $('#resico').innerHTML = art(good ? 'toothHappy' : 'toothSad');
  $('#restext').textContent = good ? 'Good!' : 'Bad!'; $('#restext').className = 'big ' + (good ? 'goodc' : 'badc');
  $('#resnote').textContent = ok ? 'Well done!' : 'Good try!';
  if (ok) { sfx.good(); burst(); } else { sfx.bad(); $('#panel').classList.remove('shake'); void $('#panel').offsetWidth; $('#panel').classList.add('shake'); }
});
$('#next').onclick = () => {
  done[cur] = true; $('#qv').classList.add('hidden');
  if (done.every(Boolean)) { draw(); showFinish('Great job!'); } else { nextTurn(); draw(); }
};
draw();
