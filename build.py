#!/usr/bin/env python3
"""Builds each game into one self-contained HTML file (no network needed)."""
import pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
rd = lambda n: (src / n).read_text(encoding='utf8')
HOME = '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M8 30 L30 10 L52 30 M14 26 V50 H46 V26" fill="none" stroke="#0E4B5A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
PAGES = [
    ('index', 'index.html', 'Dental Care Games', 'Choose a game. The teacher keeps the team points on the board.', False),
    ('g1', 'game1-good-or-bad.html', 'Good or Bad for Your Teeth?', 'The teacher models tile 1. Then each team chooses a number and the teacher taps its answer.', False),
    ('g2', 'game2-listen-and-tap.html', 'Listen and Tap', 'Tap Listen to hear the phrase. One student taps the picture. Question 1 is the teacher\'s model.', False),
    ('g3', 'game3-happy-or-sad-tooth.html', 'Happy Tooth or Sad Tooth?', 'The class says the phrase. One player taps a tooth.', False),
    ('g4', 'game4-pop-and-say.html', 'Pop and Say', 'Round 1 is the teacher\'s model. Pop the bubbles, tell your friend, then the team says it.', False),
    ('g5', 'game5-lucky-tooth.html', 'Lucky Tooth', 'The teacher opens tooth T as a model. Then each team chooses a tooth and says the sentence.', False),
    ('timer', 'timer.html', 'Timer', 'Three minutes: each team sticks the stickers on its big poster.', False),
]
for key, out, title, hint, teams in PAGES:
    is_home = key == 'index'
    html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Dental Care Games</title>
<style>
{rd('common.css')}
{rd(key + '.css')}
</style>
</head>
<body>
<header class="bar">
  {'' if is_home else f'<a class="home" href="index.html" aria-label="All games">{HOME}</a>'}
  <h1>{title}</h1>
  {'<div id="teams"></div>' if teams else ''}
</header>
<main id="stage">
{rd(key + '.html')}
</main>
<footer class="foot">
  <span>{hint}</span><span class="sp"></span>
  {'<button class="btn small" id="btnScores">Reset scores</button>' if teams else ''}
  {'' if is_home or key == 'timer' else '<button class="btn small" id="btnAgain">Play again</button>'}
  <button class="btn small" id="btnFull">Full screen</button>
</footer>
<script>
{rd('art.js')}
{rd('common.js')}
{rd(key + '.js')}
</script>
</body>
</html>
"""
    (root / out).write_text(html, encoding='utf8')
    print('built', out, len(html))
