/* WCAG 2.1 contrast audit.

   Reads the real token values out of css/tokens.css so it cannot drift from
   what ships, and checks every foreground/background pair the page actually
   renders, at the size and weight it renders them.

   The ink ladder is lake-900 alphas now, not opaque hexes, so this tool
   composites: rgba(0,0,0,a) painted on an opaque ground is
   ground * (1 - a), and that composite is what a reader's eye receives and
   what the ratio has to be computed from. The previous version could only
   parse `#rrggbb`; against the current palette every single pair would have
   returned null, printed "skip (non-hex token)", and then reported
   "All pairs pass." A skip is now a FAILURE — an audit that cannot read its
   own input has not audited anything.

   Run: node tools/contrast.mjs
*/

import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../css/tokens.css', import.meta.url), 'utf8');

function tokensFrom(blockRe) {
  const block = css.match(blockRe);
  if (!block) throw new Error('token block not found: ' + blockRe);
  const out = {};
  for (const m of block[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

/* One theme. The [data-ui-theme="light"] block and the toggle are gone. */
const T = tokensFrom(/:root\s*\{([\s\S]*?)\n\}/);

/* A token may alias another. Follow the chain so the audit tests the colour
   that actually paints, not the string that names it. */
function resolve(value, depth = 0) {
  const s = String(value).trim();
  const m = s.match(/^var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)$/);
  if (!m) return s;
  if (depth > 8 || !(m[1] in T)) return s;
  return resolve(T[m[1]], depth + 1);
}

/* Parse to [r, g, b, a]. Throws rather than returning null: an unreadable
   token must stop the audit, not be quietly excused from it. */
function parse(token) {
  const s = resolve(T[token] ?? token).trim();

  const h = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (h) {
    const d = h[1].length === 3 ? h[1].split('').map((c) => c + c).join('') : h[1];
    return [...[0, 2, 4].map((i) => parseInt(d.slice(i, i + 2), 16)), 1];
  }

  const rgba = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i);
  if (rgba) {
    const a = rgba[4] === undefined ? 1
      : rgba[4].endsWith('%') ? parseFloat(rgba[4]) / 100
      : parseFloat(rgba[4]);
    return [+rgba[1], +rgba[2], +rgba[3], a];
  }

  throw new Error(`cannot parse colour for ${token}: "${s}"`);
}

/* Source-over: what the eye actually receives. */
const over = ([r, g, b, a], [br, bg_, bb]) =>
  [r * a + br * (1 - a), g * a + bg_ * (1 - a), b * a + bb * (1 - a)];

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

function ratio(fgRGBA, bgRGBA, groundTok = '--white') {
  // A translucent BACKGROUND is composited on its ground first, then the
  // foreground on that. The ground is the page unless the pair names one:
  // inside a night band it is the band, and a stat card's translucent fill
  // is laid over the night, never over white.
  const bg = over(bgRGBA, parse(groundTok).slice(0, 3));
  const fg = over(fgRGBA, bg);
  const a = lum(fg), b = lum(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/* Every pair the page renders, at the size it renders it. Grounds: white
   (cards, panels, rows), sky-100 (the splash and results), sky-50 (the
   plain page, stat tiles, flags), chip (badges). */
const PAIRS = [
  // --- reading -----------------------------------------------------------
  ['splash question (display)', '--ink',       '--sky-100', 56, false],
  ['question accent',           '--blue-deep', '--sky-100', 56, false],
  ['promise line',              '--blue-deep', '--sky-100', 16, false],
  ['tile name',                 '--ink',       '--white',   20, true],
  ['tile count',                '--ink-3',     '--white',   14, false],
  ['trust caption',             '--ink-2',     '--sky-50',  16, false],
  ['view headline',             '--ink',       '--sky-50',  48, false],
  ['view sub',                  '--ink-2',     '--sky-50',  17, false],
  ['card name',                 '--ink',       '--white',   23, true],
  ['card summary',              '--ink-2',     '--white',   15, false],
  ['figure label',              '--ink-3',     '--white',   14, false],
  ['row summary',               '--ink-2',     '--white',   14, false],
  ['row summary on hover',      '--ink-2',     '--sky-50',  14, false],
  ['panel prose',               '--ink',       '--white',   17, false],
  ['panel fine print',          '--ink-2',     '--white',   14, false],
  ['stat label',                '--ink',       '--sky-50',  14, true],
  ['stat note',                 '--ink-2',     '--sky-50',  14, false],
  ['stat of /100',              '--ink-3',     '--sky-50',  20, false],
  ['flag text',                 '--ink',       '--sky-50',  15, false],
  ['link',                      '--blue-deep', '--white',   15, false],
  ['link on sky',               '--blue-deep', '--sky-100', 15, false],
  ['link on sky-50',            '--blue-deep', '--sky-50',  15, false],
  ['text link (ink-2)',         '--ink-2',     '--sky-100', 16, false],
  ['badge',                     '--ink-2',     '--chip',    14, true],
  ['best-fit badge',            '--blue-deep', '--sky-100', 14, true],
  ['cause tag',                 '--blue-deep', '--sky-100', 14, true],
  ['place chip',                '--ink',       '--chip',    14, false],
  ['before-you-give',           '--ink',       '--sky-100', 15, false],
  ['footer',                    '--ink-2',     '--white',   15, false],

  // --- controls ------------------------------------------------------------
  ['primary button',            '--blue-ink',  '--blue',      15, true],
  ['primary button hover',      '--blue-ink',  '--blue-soft', 15, true],
  ['dark button',               '--white',     '--ink',       15, true],
  ['outline button',            '--ink',       '--white',     15, true],
  ['pill label',                '--ink',       '--white',     15, true],
  ['saved count on flag blue',  '--blue-ink',  '--blue',      14, true],
  ['toast',                     '--white',     '--ink',       15, true],

  // --- evidence and caution ------------------------------------------------
  ['randomized trial tag',      '--green',     '--green-bg',   14, true],
  ['independent study tag',     '--green-2',   '--green-2-bg', 14, true],
  ['self-reported tag',         '--ink-2',     '--chip',       14, true],
  ['caution on white',          '--caution',   '--white',      14, true],
  ['caution on sky-50',         '--caution',   '--sky-50',     14, true],
  ['caution line, hovered',     '--caution',   '--caution-bg', 14, true],
  ['deficit figure',            '--caution',   '--sky-50',     38, false],

  // --- non-text, 3:1 (WCAG 1.4.11) -----------------------------------------
  ['NT control edge',           '--line-strong', '--white',   0, false],
  ['NT control edge on sky',    '--line-strong', '--sky-100', 0, false],
  ['NT focus ring on white',    '--focus',       '--white',   0, false],
  ['NT focus ring on sky',      '--focus',       '--sky-100', 0, false],
  ['NT pill chevron',           '--blue-deep',   '--white',   0, false],
  ['NT caution rule',           '--caution',     '--sky-50',  0, false],
  ['NT saved mark',             '--blue-deep',   '--white',   0, false],
  // Not audited: the flag-blue keel and the best-fit edge (decoration; the
  // "Best fit" badge carries the state in text), and the stars (aria-hidden).
];

function need(size, bold, isNonText) {
  if (isNonText) return 3.0;
  // WCAG large text: >=24px, or >=18.66px bold (700+).
  const large = size >= 24 || (bold && size >= 18.66);
  return large ? 3.0 : 4.5;
}

let fails = 0;
console.log('ratio   need   result  element                     fg → bg');
for (const [label, fgTok, bgTok, size, bold, ground] of PAIRS) {
  const isNT = label.startsWith('NT ');
  const req = need(size, bold, isNT);
  let r;
  try {
    r = ratio(parse(fgTok), parse(bgTok), ground);
  } catch (e) {
    fails++;
    console.log(`   --   ${req.toFixed(1).padStart(4)}   FAIL   ${label.padEnd(26)}  ${e.message}`);
    continue;
  }
  const ok = r >= req;
  if (!ok) fails++;
  console.log(
    `${r.toFixed(2).padStart(5)}  ${req.toFixed(1).padStart(4)}   ${ok ? 'pass  ' : 'FAIL  '} ` +
    `${label.padEnd(26)}  ${resolve(T[fgTok] ?? fgTok)} on ${resolve(T[bgTok] ?? bgTok)}`
  );
}

console.log(`\n${fails === 0 ? `All ${PAIRS.length} pairs pass.` : fails + ' FAILING pair(s).'}`);
process.exit(fails === 0 ? 0 : 1);
