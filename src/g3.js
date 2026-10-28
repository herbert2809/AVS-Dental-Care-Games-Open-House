const CARDS = [['brushA', 1], ['candyA', 0], ['milk', 1], ['soda', 0], ['milkB', 1], ['candyB', 0], ['sodaB', 0], ['brushB', 1]];
const PHRASE = { brush: 'Brush your teeth.', candy: 'Eat candy.', milk: 'Drink milk.', soda: 'Drink soda.' };
let n = 0, first = true, locked = false;
document.querySelectorAll('[data-art]').forEach((x) => { x.innerHTML = art(x.dataset.art); });
function draw() {
  first = true; locked = false;
  $('#who').innerHTML = turnChip(); $('#card').innerHTML = art(CARDS[n][0]); $('#card').classList.remove('pulse');
  $('#cap').innerHTML = '&nbsp;'; $('#next').style.visibility = 'hidden';
  $('#dots').innerHTML = CARDS.map((c, i) => `<i class="${i < n ? 'd' : i === n ? 'c' : ''}"></i>`).join('');
}
function tapPile(e) {
  if (locked) return;
  const pile = e.currentTarget, good = CARDS[n][1] === 1;
  if ((pile.dataset.v === '1') === good) {
    locked = true; sfx.good(); if (first) burst();
    $(good ? '#gotG' : '#gotB').insertAdjacentHTML('beforeend', art(CARDS[n][0]));
    $('#cap').innerHTML = `${PHRASE[CARDS[n][0].replace(/[AB]$/, '')]} <span class="${good ? 'goodc' : 'badc'}">${good ? 'Good!' : 'Bad!'}</span>`;
    $('#card').classList.add('pulse'); pile.classList.remove('pulse'); void pile.offsetWidth; pile.classList.add('pulse');
    $('#next').textContent = n === CARDS.length - 1 ? 'Finish' : 'Next card'; $('#next').style.visibility = 'visible';
  } else { first = false; sfx.bad(); pile.classList.remove('shake'); void pile.offsetWidth; pile.classList.add('shake'); }
}
$('#good').onclick = tapPile; $('#bad').onclick = tapPile;
$('#next').onclick = () => { n++; if (n >= CARDS.length) { $('#next').style.visibility = 'hidden'; showFinish('Happy teeth!'); } else { nextTurn(); draw(); } };
draw();
