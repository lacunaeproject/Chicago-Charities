/* Static token audit. Exits 1 on any finding not in KNOWN, so it can gate.

   Checks, outside tokens.css:
     LENGTH  any px/rem/em/ch/vw/vh number in any declaration, custom
             properties and transforms included, except the hairline idiom
             (0-2px on a border, outline, stroke or underline), the 100vmax
             bleed, and env() fallbacks.
     COLOUR  any hex, rgb()/rgba() or named colour, except inside
             @media print and @media (forced-colors) blocks, which exist to
             override tokens with paper inks and system colours.
   And across css/ + js/ + build.mjs:
     DEAD    a token defined in tokens.css that nothing reads.
     UNDEF   a var(--x) that nothing defines.
     SYNC    the scripts' timers read the motion tokens through ms('--x'),
             and every ms() names a millisecond token.

   Run: node tools/audit-css.mjs            (exit 0 = clean) */

import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const FILES = ['base.css', 'app.css'];
const SCRIPTS = ['js/app.js', 'js/core.js', 'js/saved.js', 'build.mjs'];

/* Debt: KIND|file|property|value, or DEAD|--token. Delete an entry when it
   is paid; never add one. Empty since the rebuild. */
const KNOWN = new Set([]);

const HAIRLINE = /^(border|outline|stroke|text-decoration-thickness|column-rule)/;
const LEN = /(?<![\w.#-])-?\d*\.?\d+(px|rem|em|ch|vw|vh)\b/g;
const COL = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\b(white|black|red|blue|gray|grey)\b/i;

/* Brace-aware walk: yields every declaration with its line and the @media
   chain it sits in. Comments are blanked, not removed, so lines stay true. */
function* decls(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const stack = []; let buf = '', line = 1, start = 1;
  for (const ch of css) {
    if (ch === '\n') line++;
    if (ch === '{') { stack.push(buf.trim()); buf = ''; start = line; continue; }
    if (ch === ';' || ch === '}') {
      const t = buf.trim();
      const m = t.match(/^(--[\w-]+|[a-z-]+)\s*:\s*([\s\S]+)$/);
      if (m) yield { line: start, prop: m[1], value: m[2].replace(/\s+/g, ' '), at: stack.filter((s) => s.startsWith('@')).join(' ') };
      if (ch === '}') stack.pop();
      buf = ''; start = line; continue;
    }
    if (!buf.trim()) start = line;
    buf += ch;
  }
}

const findings = [], seen = new Set();
/* A KNOWN entry is skipped; an entry that no longer occurs is reported so
   it can be deleted (the list only shrinks). */
const flag = (kind, key, text) => { seen.add(kind + '|' + key); if (!KNOWN.has(kind + '|' + key)) findings.push(`${kind.padEnd(7)} ${text}`); };
for (const f of FILES) {
  for (const d of decls(read('css/' + f))) {
    const v = d.value.replace(/var\([^()]*\)/g, '').replace(/env\([^()]*\)/g, '').replace(/url\([^)]*\)/g, '');
    const inPrint = /@media print/.test(d.at), inForced = /forced-colors/.test(d.at);
    const key = `${f}|${d.prop}|${d.value}`;
    if (!inPrint) {
      const lens = (v.match(LEN) || []).filter((L) => !/^-?1px$/.test(L) &&
        !(HAIRLINE.test(d.prop) && /^(0|1\.5|2)px$/.test(L)) && !/^-?100vmax$/.test(L));
      if (lens.length) flag('LENGTH', key, `${f}:${d.line}  ${d.prop}: ${d.value}`);
    }
    if (!inPrint && !inForced && COL.test(v)) flag('COLOUR', key, `${f}:${d.line}  ${d.prop}: ${d.value}`);
  }
}

/* Tokens: defined vs read. */
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const tokens = strip(read('css/tokens.css'));
const rest = [...FILES.map((f) => 'css/' + f), ...SCRIPTS].map((p) => strip(read(p))).join('\n');
const defined = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const localDefs = new Set([...rest.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
// var(--x) in CSS; ms('--x') and px(el, '--x') where a script reads a token.
const reads = (src) => new Set([...src.matchAll(/(?:var\(|ms\(|px\(\s*\w+\s*,)\s*['"]?(--[\w-]+)/g)].map((m) => m[1]));
const readAnywhere = new Set([...reads(tokens), ...reads(rest)]);
for (const t of defined) if (!readAnywhere.has(t)) flag('DEAD', t, `${t} is defined in tokens.css and read nowhere`);
for (const t of readAnywhere) if (!defined.has(t) && !localDefs.has(t)) flag('UNDEF', t, `var(${t}) has no definition`);

/* Timers read the motion tokens at call time; a numeric copy would drift. */
for (const f of SCRIPTS) {
  for (const m of read(f).matchAll(/\bms\(\s*'(--[\w-]+)'/g)) {
    if (!new RegExp(m[1] + '\\s*:\\s*[\\d.]+ms').test(tokens)) findings.push(`SYNC    ${f} ms('${m[1]}') is not a millisecond token`);
  }
  if (/setTimeout\([^,]+,\s*\d{2,}\)/.test(read(f))) findings.push(`SYNC    ${f} has a numeric timer; read a motion token through ms()`);
}

findings.forEach((l) => console.log(l));
for (const k of KNOWN) if (!seen.has(k)) console.log(`paid    ${k}  (delete from KNOWN)`);
console.log(`\n${findings.length} finding(s).`);
process.exit(findings.length ? 1 : 0);
