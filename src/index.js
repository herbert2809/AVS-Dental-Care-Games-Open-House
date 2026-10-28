const GAMES = [
  ['game1-good-or-bad.html', 'toothHappy', 'Good or Bad for Your Teeth?', 'Game 1, lead-in'],
  ['game2-listen-and-tap.html', 'ear', 'Listen and Tap', 'Game 2, presentation'],
  ['game3-happy-or-sad-tooth.html', 'toothSad', 'Happy Tooth or Sad Tooth?', 'Game 3, practice'],
  ['game4-pop-and-say.html', 'milkB', 'Pop and Say', 'Game 4, practice'],
  ['game5-lucky-tooth.html', 'star', 'Lucky Tooth', 'Game 5, production'],
  ['timer.html', 'calendar', 'Timer', '3 minutes for the group poster'],
];
$('#hub').innerHTML = GAMES.map((g) => `<a class="go-card card" href="${g[0]}"><span class="pic">${art(g[1])}</span><span><div class="t">${g[2]}</div><div class="s">${g[3]}</div></span></a>`).join('');
