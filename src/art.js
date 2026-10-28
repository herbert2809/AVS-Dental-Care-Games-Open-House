// Original pictures for the Dental Care games. Every picture is drawn in a 200 x 200 box.
const INK = '#0E4B5A';
const S = `stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const S4 = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

const TOOTH_PATH = 'M60 36 C36 36 26 60 31 92 C35 122 42 150 55 170 C64 183 75 171 79 150 C83 131 90 124 100 124 C110 124 117 131 121 150 C125 171 136 183 145 170 C158 150 165 122 169 92 C174 60 164 36 140 36 C124 36 116 46 100 46 C84 46 76 36 60 36 Z';

function toothShape(fill) { return `<path d="${TOOTH_PATH}" fill="${fill}" ${S}/>`; }

function kid(mouth) {
  return `<circle cx="78" cy="110" r="54" fill="#FFD9B8" ${S}/>
  <path d="M25 104 C20 62 52 44 80 46 C112 44 138 66 131 106 C120 86 102 74 78 78 C56 74 38 88 25 104 Z" fill="#5B3A29" ${S}/>
  <circle cx="60" cy="110" r="5.5" fill="${INK}"/><circle cx="96" cy="110" r="5.5" fill="${INK}"/>
  <circle cx="45" cy="127" r="8" fill="#FF9E8F" opacity=".75"/><circle cx="111" cy="127" r="8" fill="#FF9E8F" opacity=".75"/>
  ${mouth}`;
}
const MOUTH_SMILE = `<path d="M56 131 Q78 156 100 131 Z" fill="#fff" ${S4}/>`;
const MOUTH_OPEN = `<ellipse cx="78" cy="140" rx="14" ry="11" fill="#B3364A" ${S4}/>`;

function candy(x, y, r, color, scale) {
  return `<g transform="translate(${x},${y}) rotate(${r}) scale(${scale || 1})">
    <path d="M-20 0 L-44 -15 L-44 15 Z" fill="${color}" ${S4}/><path d="M20 0 L44 -15 L44 15 Z" fill="${color}" ${S4}/>
    <ellipse rx="25" ry="18" fill="${color}" ${S4}/>
    <path d="M-8 -16 Q2 0 -8 16 M8 -16 Q18 0 8 16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`;
}
function toothbrush(x, y, r, scale) {
  return `<g transform="translate(${x},${y}) rotate(${r}) scale(${scale || 1})">
    <rect x="20" y="-7" width="100" height="14" rx="7" fill="#3B82F6" ${S4}/>
    <rect x="-10" y="-9" width="38" height="12" rx="4" fill="#3B82F6" ${S4}/>
    <rect x="-8" y="-24" width="34" height="16" rx="4" fill="#fff" ${S4}/>
    <path d="M1 -24 V-9 M9 -24 V-9 M17 -24 V-9" stroke="${INK}" stroke-width="2.5"/></g>`;
}
function pencil(x, y, r, scale, bites) {
  const marks = bites ? `<path d="M30 -9 a7 7 0 0 0 14 0 Z M52 -9 a7 7 0 0 0 14 0 Z M40 9 a7 7 0 0 1 14 0 Z" fill="#8A5A2B" ${S4}/>` : '';
  return `<g transform="translate(${x},${y}) rotate(${r}) scale(${scale || 1})">
    <rect x="-14" y="-9" width="16" height="18" rx="4" fill="#FF8FA3" ${S4}/>
    <rect x="2" y="-9" width="98" height="18" fill="#F5B300" ${S4}/>
    <path d="M100 -9 L128 0 L100 9 Z" fill="#F3D2A9" ${S4}/><path d="M118 -3.4 L128 0 L118 3.4 Z" fill="${INK}"/>
    ${marks}</g>`;
}
function star(cx, cy, r, fill) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
    d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) + ' ';
  }
  return `<path d="${d}Z" fill="${fill || '#FFC83D'}" ${S4}/>`;
}
function calendar(marks) {
  let cells = '';
  const pos = [[44, 92], [82, 92], [120, 92], [158, 92], [63, 132], [101, 132], [139, 132]];
  pos.forEach(([x, y]) => {
    cells += `<rect x="${x - 16}" y="${y - 16}" width="32" height="32" rx="6" fill="#fff" ${S4}/>`;
    cells += marks === 'stars' ? star(x, y, 11, '#FFC83D').replace('stroke-width="4"', 'stroke-width="2.5"')
      : `<path d="M${x - 8} ${y} l6 7 l11 -13" fill="none" stroke="#22A55B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  return `<rect x="18" y="34" width="166" height="136" rx="14" fill="#EAF6FF" ${S}/>
    <path d="M18 66 H184 V48 a14 14 0 0 0 -14 -14 H32 a14 14 0 0 0 -14 14 Z" fill="#E5484D" ${S}/>
    <path d="M56 24 V46 M146 24 V46" ${S}/>${cells}`;
}

const ART = {
  toothHappy: () => `${toothShape('#FFFFFF')}
    <circle cx="80" cy="80" r="6" fill="${INK}"/><circle cx="120" cy="80" r="6" fill="${INK}"/>
    <path d="M78 98 Q100 120 122 98" fill="none" ${S}/>
    <circle cx="64" cy="96" r="8" fill="#FF9E8F" opacity=".7"/><circle cx="136" cy="96" r="8" fill="#FF9E8F" opacity=".7"/>
    ${star(160, 40, 15)}${star(36, 34, 10)}`,
  toothSad: () => `${toothShape('#E9DFA8')}
    <path d="M72 76 l14 6 M128 76 l-14 6" ${S}/>
    <circle cx="80" cy="88" r="5.5" fill="${INK}"/><circle cx="120" cy="88" r="5.5" fill="${INK}"/>
    <path d="M80 114 Q100 98 120 114" fill="none" ${S}/>
    <ellipse cx="62" cy="64" rx="9" ry="7" fill="#7A5B2E"/><ellipse cx="140" cy="108" rx="8" ry="10" fill="#7A5B2E"/><circle cx="104" cy="60" r="5" fill="#7A5B2E"/>
    <path d="M150 62 q8 14 0 20 q-8 -6 0 -20 Z" fill="#7CC4F5" ${S4}/>`,
  brushA: () => `${kid(MOUTH_SMILE)}${toothbrush(88, 150, -14, 0.8)}
    <circle cx="108" cy="150" r="9" fill="#fff" ${S4}/><circle cx="122" cy="160" r="6" fill="#fff" ${S4}/><circle cx="96" cy="162" r="5" fill="#fff" ${S4}/>`,
  brushB: () => `${toothbrush(40, 78, 18, 1.15)}
    <g transform="translate(60,140) rotate(-10)"><rect x="0" y="-22" width="92" height="44" rx="8" fill="#fff" ${S}/>
    <rect x="16" y="-22" width="40" height="44" fill="#2EC4B6" ${S4}/><rect x="92" y="-12" width="18" height="24" rx="4" fill="#E5484D" ${S4}/>
    <path d="M110 0 q16 -14 26 0 q-12 12 -26 0 Z" fill="#fff" ${S4}/></g>`,
  candyA: () => `${kid(MOUTH_OPEN)}${candy(140, 146, -20, '#FF6B9D')}`,
  candyB: () => `<path d="M118 108 L150 180" ${S}/>
    <circle cx="106" cy="76" r="44" fill="#FF6B9D" ${S}/>
    <path d="M106 76 m0 -8 a8 8 0 1 1 -8 8 a18 18 0 1 1 18 18 a28 28 0 1 1 -28 -28" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    ${candy(52, 154, 14, '#FFC83D', 0.8)}${candy(160, 62, -30, '#7CC4F5', 0.62)}`,
  dentistA: () => `<circle cx="92" cy="112" r="54" fill="#FFD9B8" ${S}/>
    <path d="M40 96 C40 58 66 44 92 44 C118 44 144 58 144 96 C126 82 112 78 92 78 C72 78 58 82 40 96 Z" fill="#DFF3FF" ${S}/>
    <path d="M92 52 v18 M83 61 h18" stroke="#22A55B" stroke-width="7" stroke-linecap="round"/>
    <circle cx="74" cy="106" r="5.5" fill="${INK}"/><circle cx="110" cy="106" r="5.5" fill="${INK}"/>
    <path d="M52 124 Q92 112 132 124 L128 150 Q92 172 56 150 Z" fill="#7CC4F5" ${S}/>
    <path d="M52 126 L40 116 M132 126 L144 116" ${S4}/>
    <path d="M150 186 L170 122" ${S}/><circle cx="172" cy="104" r="20" fill="#EAF6FF" ${S}/>`,
  dentistB: () => `<g transform="translate(-14,12) scale(.86)">${toothShape('#FFFFFF')}
    <circle cx="80" cy="82" r="6" fill="${INK}"/><circle cx="120" cy="82" r="6" fill="${INK}"/><path d="M80 100 Q100 118 120 100" fill="none" ${S}/></g>
    <path d="M132 188 L158 108" ${S}/><circle cx="162" cy="90" r="24" fill="#EAF6FF" ${S}/>
    <circle cx="44" cy="44" r="26" fill="#22A55B" ${S4}/><path d="M44 30 v28 M30 44 h28" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`,
  pencilA: () => `${kid(`<ellipse cx="78" cy="142" rx="17" ry="13" fill="#B3364A" ${S4}/>`)}${pencil(72, 143, -6, 0.86)}
    <rect x="64" y="130" width="11" height="9" rx="2" fill="#fff" ${S4}/><rect x="80" y="130" width="11" height="9" rx="2" fill="#fff" ${S4}/>`,
  pencilB: () => `${pencil(38, 150, -38, 1.18, true)}
    <path d="M36 44 l10 12 M60 30 l4 15 M20 66 l14 6" ${S}/>`,
  apple: () => `${kid(MOUTH_OPEN)}
    <path d="M148 120 C128 104 104 122 110 150 C114 172 132 184 148 176 C164 184 182 172 186 150 C192 122 168 104 148 120 Z" fill="#E5484D" ${S}/>
    <path d="M148 120 q-2 -16 10 -22" fill="none" ${S}/><path d="M158 100 q16 -10 24 2 q-14 10 -24 -2 Z" fill="#22A55B" ${S4}/>`,
  soda: () => `${kid(MOUTH_OPEN)}
    <path d="M118 112 L182 112 L172 186 L128 186 Z" fill="#8A4B2A" ${S}/>
    <path d="M118 112 L182 112 L179 132 L121 132 Z" fill="#fff" ${S4}/>
    <circle cx="140" cy="152" r="5" fill="#fff" opacity=".8"/><circle cx="158" cy="168" r="4" fill="#fff" opacity=".8"/><circle cx="160" cy="146" r="3" fill="#fff" opacity=".8"/>
    <path d="M150 122 L138 96 L96 140" fill="none" stroke="#E5484D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,
  milk: () => `${kid(MOUTH_SMILE)}
    <path d="M122 104 L180 104 L174 186 L128 186 Z" fill="#EAF6FF" ${S}/>
    <path d="M124 128 L178 128 L174 186 L128 186 Z" fill="#fff" ${S4}/>
    <path d="M58 133 q20 -10 40 0" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  chocolate: () => `${kid(MOUTH_OPEN)}
    <g transform="translate(146,146) rotate(14)"><rect x="-34" y="-44" width="68" height="88" rx="6" fill="#6B3E26" ${S}/>
    <path d="M-34 -14 H34 M-34 16 H34 M0 -44 V44" stroke="#8A5A3C" stroke-width="5"/>
    <path d="M-34 10 H34 V44 a6 6 0 0 1 -6 6 H-28 a6 6 0 0 1 -6 -6 Z" fill="#F5B300" ${S4} transform="translate(0,-6)"/></g>`,
  appleB: () => `<g transform="translate(-102,-80) scale(1.3)"><path d="M148 120 C128 104 104 122 110 150 C114 172 132 184 148 176 C164 184 182 172 186 150 C192 122 168 104 148 120 Z" fill="#E5484D" ${S4}/>
    <path d="M148 120 q-2 -16 10 -22" fill="none" ${S4}/><path d="M158 100 q16 -10 24 2 q-14 10 -24 -2 Z" fill="#22A55B" ${S4}/></g>
    <g transform="translate(75,72) scale(.62)"><path d="M148 120 C128 104 104 122 110 150 C114 172 132 184 148 176 C164 184 182 172 186 150 C192 122 168 104 148 120 Z" fill="#7BC74D" ${S}/>
    <path d="M148 120 q-2 -16 10 -22" fill="none" ${S}/></g>
    <path d="M70 100 q-8 12 0 24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  milkB: () => `<path d="M40 72 L72 38 L104 72 Z" fill="#7CC4F5" ${S}/><rect x="40" y="72" width="64" height="112" rx="4" fill="#fff" ${S}/>
    <rect x="40" y="112" width="64" height="34" fill="#7CC4F5" ${S4}/><circle cx="72" cy="129" r="9" fill="#fff" ${S4}/>
    <path d="M124 98 L182 98 L174 186 L132 186 Z" fill="#EAF6FF" ${S}/><path d="M127 118 L179 118 L174 186 L132 186 Z" fill="#fff" ${S4}/>
    <path d="M150 40 q10 16 0 24 q-10 -8 0 -24 Z" fill="#fff" ${S4}/>`,
  sodaB: () => `<rect x="58" y="44" width="84" height="140" rx="16" fill="#E5484D" ${S}/>
    <ellipse cx="100" cy="50" rx="40" ry="10" fill="#D9E2E8" ${S4}/><path d="M92 46 h16" ${S4}/>
    <path d="M58 104 q21 -14 42 0 t42 0 v26 q-21 -14 -42 0 t-42 0 Z" fill="#fff" ${S4}/>
    <circle cx="164" cy="64" r="9" fill="#fff" ${S4}/><circle cx="178" cy="98" r="6" fill="#fff" ${S4}/><circle cx="160" cy="34" r="5" fill="#fff" ${S4}/>
    <circle cx="34" cy="80" r="7" fill="#fff" ${S4}/><circle cx="28" cy="116" r="4.5" fill="#fff" ${S4}/>`,
  sun: () => `<g ${S}><path d="M100 14 V34 M100 166 V186 M14 100 H34 M166 100 H186 M39 39 L53 53 M147 147 L161 161 M39 161 L53 147 M147 53 L161 39"/></g>
    <circle cx="100" cy="100" r="52" fill="#FFC83D" ${S}/>
    <circle cx="82" cy="92" r="6" fill="${INK}"/><circle cx="118" cy="92" r="6" fill="${INK}"/><path d="M80 110 Q100 130 120 110" fill="none" ${S}/>`,
  plate: () => `<circle cx="100" cy="104" r="62" fill="#fff" ${S}/><circle cx="100" cy="104" r="40" fill="#EAF6FF" ${S4}/>
    <circle cx="88" cy="96" r="4" fill="#C98A4B"/><circle cx="112" cy="112" r="3.5" fill="#C98A4B"/><circle cx="104" cy="92" r="3" fill="#C98A4B"/>
    <path d="M20 40 V84 M10 40 V68 a10 10 0 0 0 20 0 V40 M20 84 V172" fill="none" ${S}/>
    <path d="M180 172 V92 M180 92 c-14 -8 -14 -44 0 -54 c14 10 14 46 0 54 Z" fill="#EAF6FF" ${S}/>`,
  calendar: () => calendar('ticks'),
  calendarStars: () => calendar('stars'),
  star: () => `${star(100, 104, 78)}<circle cx="84" cy="98" r="6" fill="${INK}"/><circle cx="116" cy="98" r="6" fill="${INK}"/><path d="M84 116 Q100 132 116 116" fill="none" ${S}/>`,
  ear: () => `<path d="M70 150 C40 120 44 50 100 44 C150 40 168 96 140 122 C126 134 126 150 116 162 C104 176 82 172 78 156" fill="#FFD9B8" ${S}/>
    <path d="M84 116 C74 92 86 70 106 72 C126 74 130 96 116 106" fill="none" ${S}/>
    <path d="M160 60 q14 20 0 40 M176 46 q24 34 0 68" fill="none" ${S}/>`,
  thumbUp: () => `<path d="M40 96 H72 V172 H40 Z" fill="#fff" ${S}/><path d="M72 100 C92 86 96 62 96 40 C116 36 124 58 116 86 H152 C170 86 170 108 158 110 C170 114 168 132 154 134 C164 140 160 156 148 156 C154 164 148 174 136 174 H96 C84 174 80 168 72 166 Z" fill="#FFD9B8" ${S}/>`,
};

function artInner(key) { return (ART[key] || ART.star)(); }
function art(key, cls) { return `<svg class="art ${cls || ''}" viewBox="0 0 200 200" aria-hidden="true">${artInner(key)}</svg>`; }
