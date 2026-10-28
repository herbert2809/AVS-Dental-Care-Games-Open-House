const PHRASE = { brush: 'Brush your teeth.', candy: 'Eat candy.', milk: 'Drink milk.', soda: 'Drink soda.' };
const say = (k) => PHRASE[k.replace(/[AB]$/, '')];
const QS = [
  { t: 'milkB', o: ['brushB', 'candyB', 'milkB', 'sodaB'] }, // teacher's model question
  { t: 'candyA', o: ['brushA', 'soda', 'candyA', 'milk'] },
  { t: 'soda', o: ['soda', 'brushA', 'milk', 'candyA'] },
  { t: 'brushA', o: ['milk', 'candyA', 'brushA', 'soda'] },
  { t: 'milk', o: ['candyA', 'milk', 'soda', 'brushA'] },
];
let q = 0, locked = false, voice = null;
turn = -1;
function pickVoice() {
  try { const v = speechSynthesis.getVoices(); voice = v.find((x) => /^en-US/i.test(x.lang)) || v.find((x) => /^en/i.test(x.lang)) || null; } catch (e) { voice = null; }
}
try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch (e) { /* no speech */ }
function speak() {
  const b = $('#play'); b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(say(QS[q].t)); u.lang = 'en-US'; u.rate = 0.75; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  } catch (e) { /* no speech: the teacher says the phrase */ }
}
$('#play').onclick = speak; $('.earbox').onclick = speak;
document.querySelectorAll('[data-art]').forEach((n) => { n.innerHTML = art(n.dataset.art); });
function draw() {
  locked = false;
  $('#qn').textContent = q === 0 ? 'Listen!' : `Listen! ${q}`; $('#who').innerHTML = turnChip(); $('#said').innerHTML = '&nbsp;'; $('#next').classList.add('hidden');
  $('#opts').innerHTML = QS[q].o.map((k) => `<button class="opt" data-k="${k}" aria-label="Picture">${art(k)}</button>`).join('');
}
$('#opts').addEventListener('click', (e) => {
  const b = e.target.closest('button.opt'); if (!b || locked || b.classList.contains('wrong')) return;
  if (b.dataset.k === QS[q].t) {
    locked = true; b.classList.add('right', 'pulse'); $('#said').textContent = say(QS[q].t);
    burst(); sfx.good();
    $('#next').textContent = q === QS.length - 1 ? 'Finish' : 'Next'; $('#next').classList.remove('hidden');
  } else { b.classList.add('wrong', 'shake'); sfx.bad(); }
});
$('#next').onclick = () => { q++; if (q >= QS.length) { $('#next').classList.add('hidden'); showFinish('Well done!'); } else { nextTurn(); draw(); setTimeout(speak, 400); } };
draw();
