/* BUILD: pre-renders index.html. Without script the page is complete: the
   question and its tiles, all 39 charities grouped by cause with working
   Donate links, and how they were checked. With script, js/app.js turns the
   same page into views (home, results, all, how) and adds the details and
   saved panels.

   Run: node build.mjs */

import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { EVENTS, STANDING, EVENTS_CHECKED } from './data/events.js';
import {
  ORGS, CAUSES, EVIDENCE_TIERS, FLAG_LABELS, VERIFIED_AS_OF, FAQ, SOURCES, SITE, BEACON_CAVEAT,
  esc, money, longDate, inCause, icon, stars, row, external, logo, byId, AREAS, SIDES, MAP, worksIn, TOTAL_SPEND, RATIO_MEDIAN, CAUTION_KINDS
} from './js/core.js';

const N = ORGS.length;
const VERIFIED = longDate(VERIFIED_AS_OF);
const DESCRIPTION = SITE.description.replace('{count}', N);
const sortKey = (o) => o.name.replace(/^(The|A)\s+/i, '').toLowerCase();

/* FAQ tokens, filled from the data so the copy cannot drift. */
const FYS = [...new Set(ORGS.map((o) => o.financials && o.financials.fiscalYear).filter(Boolean))];
const fyCount = (fy) => ORGS.filter((o) => o.financials && o.financials.fiscalYear === fy).length;
const WORD = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const word = (n) => WORD[n] || String(n);
const fill = (t) => t
  .replace(/\{\{verified\}\}/g, VERIFIED)
  .replace(/\{\{fy(\d{4})\}\}/g, (_, y) => word(fyCount('FY' + y)));
for (const f of FAQ) if (/\{\{/.test(fill(f.a))) throw new Error('Unfilled FAQ token: ' + f.q);
if (!SITE.contact) console.warn('meta.js SITE.contact is empty: the Corrections line has no address.');

/* --- the home view -------------------------------------------------------- */

const tiles = CAUSES.map((c) => `
        <li><a class="tile" href="#all-${c.id}" data-cause="${c.id}" style="view-transition-name: cause-${c.id}">
          ${icon(c.id)}<span><span class="tile-t">${esc(c.short)}</span><span class="tile-n">${inCause(c.id).length} charities</span></span>
        </a></li>`).join('');

/* --- your side of town: the 77 community areas --------------------------------- */

const named = (a) => ORGS.some((o) => worksIn(o, a.name));
const local = `
    <section class="wrap local js-only" aria-labelledby="local-h">
      <div class="local-map">
        <svg viewBox="0 0 ${MAP.w} ${MAP.h}" role="img" aria-labelledby="local-map-t"><title id="local-map-t">Map of Chicago’s 77 community areas. Shaded areas are named by at least one charity here.</title>${AREAS.map((a) => `<path d="${a.d}" data-area="${esc(a.name)}"${named(a) ? ' class="is-named"' : ''}><title>${esc(a.name)}</title></path>`).join('')}</svg>
        <p class="fine">Shaded: a charity here names the area. Boundaries: City of Chicago.</p>
      </div>
      <div class="local-side">
        <h2 class="local-h" id="local-h">Your side of town.</h2>
        <p class="local-sub">Tap your community area, or choose it here, to see who works there by name, and who works across the whole city.</p>
        <label class="pill local-pick">${icon('local')}<span class="sr-only">Community area</span>
          <select id="local-area"><option value="">Choose a community area</option>${SIDES.map((s) => `<optgroup label="${esc(s)}">${AREAS.filter((a) => a.side === s).sort((a, b) => a.name.localeCompare(b.name)).map((a) => `<option value="${esc(a.name)}">${esc(a.name)}</option>`).join('')}</optgroup>`).join('')}</select></label>
        <div class="local-out" id="local-out"></div>
      </div>
    </section>`;

/* --- show up in person: dated events and standing shifts --------------------- */
/* Every date is the charity's own, checked on its site. The page is built
   with all of them; script hides any whose day has passed. */
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayOf = (iso) => { const [y, m, d] = iso.split('-').map(Number); return { m: MON[m - 1], d, y }; };
const evRow = (ev, i) => {
  const o = byId.get(ev.org), a = dayOf(ev.start), b = ev.end && dayOf(ev.end);
  return `<li class="ev-item" data-ends="${esc(ev.until || ev.end || ev.start)}">
        <p class="ev-date"><span class="ev-m">${a.m}</span><span class="ev-d">${a.d}${b ? `<span class="ev-to">–${b.m === a.m ? '' : b.m + ' '}${b.d}</span>` : ''}</span></p>
        <div class="ev-text">
          <h3 class="ev-title">${esc(ev.title)}</h3>
          <div class="ev-org">${logo(o, 'ev-logo')}<a href="${esc(o.homepage)}" data-org="${esc(o.id)}">${esc(o.name)}</a></div>
          <p class="ev-meta">${[ev.time, ev.place].filter(Boolean).map(esc).join(' · ')}${ev.signup ? ' · Sign-up required' : ''}</p>
        </div>
        <div class="ev-go">${external(ev.url, ev.signup ? 'Sign up' : 'Details', `: ${esc(ev.title)}`)}<button class="btn btn-sm js-only" type="button" data-ev="${i}">Add to calendar<span class="sr-only">: ${esc(ev.title)}</span></button></div>
      </li>`;
};
const events = EVENTS.length || STANDING.length ? `
    <section class="wrap inperson" id="in-person" aria-labelledby="inperson-h">
      <h2 class="local-h" id="inperson-h">Show up in person.</h2>
      <p class="local-sub">Walks, cleanups, plantings and volunteer shifts run by charities on this list. Dates are from each charity’s own site, checked ${esc(longDate(EVENTS_CHECKED))}; confirm before you go.</p>
      ${EVENTS.length ? `<ol class="ev-list">${EVENTS.map(evRow).join('')}</ol><button class="link ev-more js-only" type="button" hidden>Show more dates</button><p class="ev-none" hidden>No dated events are coming up right now. The standing shifts below run all year.</p>` : ''}
      ${STANDING.length ? `<h3 class="block-h ev-standing-h">Any week</h3>
      <ul class="ev-standing">${STANDING.map((s) => { const o = byId.get(s.org); return `<li>${logo(o, 'ev-logo')}<div><p class="ev-title"><a href="${esc(o.homepage)}" data-org="${esc(o.id)}">${esc(o.name)}</a>: ${esc(s.what)}</p><p class="ev-meta">${[s.when, s.place].filter(Boolean).map(esc).join(' · ')} · ${external(s.url, 'How to join', `: ${esc(o.name)}`)}</p></div></li>`; }).join('')}</ul>` : ''}
    </section>` : '';

const home = `
  <section class="view view-home" id="home" data-view="home" aria-labelledby="home-h">
    <div class="sky">
      <div class="wrap splash">
        <p class="promise">${N} Chicago charities, checked against their filings</p>
        <h1 class="q" id="home-h" tabindex="-1">What do you want your gift to <em>help with?</em></h1>
        <ul class="tiles">${tiles}
        </ul>
        <p class="unsure"><a class="link" href="#all" data-cause="any">Not sure yet? Show me the strongest evidence across every cause</a></p>
      </div>
    </div>
    <div class="wrap trust">
      <div><p class="trust-n">${N}</p><p class="trust-t">charities, each checked against its IRS filings and Charity Navigator record</p></div>
      <div><p class="trust-n">${esc(money(TOTAL_SPEND))}</p><p class="trust-t">spent a year between them, from a food bank to a single neighborhood pantry</p></div>
      <div><p class="trust-n">0%</p><p class="trust-t">taken by GiveChi. Every Donate button goes straight to the charity</p></div>
    </div>
    ${local}
    ${events}
  </section>`;

/* --- the results view: script-only, filled by app.js ------------------------ */

const fit = `
  <section class="view view-fit js-only" id="fit" data-view="fit" aria-labelledby="fit-h" hidden>
    <div class="sky sky-fill"><div class="wrap" id="fit-body"></div></div>
  </section>`;

/* --- the full list ------------------------------------------------------------ */

const groups = CAUSES.map((c) => {
  const orgs = ORGS.filter((o) => o.primaryCause === c.id).sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
  return `
      <section class="group" id="all-${c.id}" aria-labelledby="g-${c.id}">
        <h2 class="group-h" id="g-${c.id}">${icon(c.id, 'ico ico-sm')}${esc(c.label)} <span class="group-n">${orgs.length}</span></h2>
        <ul class="rows">${orgs.map(row).join('')}</ul>
      </section>`;
}).join('');

const all = `
  <section class="view view-all" id="all" data-view="all" aria-labelledby="all-h">
    <div class="wrap">
      <h1 class="view-h" id="all-h" tabindex="-1">All ${N} charities.</h1>
      <p class="view-sub">Every charity here was checked on ${esc(VERIFIED)}. Open one for why it matters, its numbers and every caution.</p>
      <div class="refine js-only" id="all-refine"></div>
      <div id="all-list">${groups}
      </div>
      <p class="all-empty js-only" id="all-empty" hidden></p>
      <p class="all-more">Looking for a charity that is not here? <a class="link" href="#how-safe">Check any charity yourself</a> in three public records.</p>
    </div>
  </section>`;

/* --- how we check ---------------------------------------------------------------- */

const tierList = Object.values(EVIDENCE_TIERS).sort((a, b) => b.rank - a.rank).map((t) =>
  `<li><span class="ev ev-${t.rank}">${esc(t.label)}</span><p>${esc(t.gloss)}</p></li>`).join('');

const how = `
  <section class="view view-how" id="how" data-view="how" aria-labelledby="how-h">
    <div class="wrap narrow">
      <h1 class="view-h" id="how-h" tabindex="-1">How we check.</h1>
      <p class="lede">Each charity was checked on ${esc(VERIFIED)} against its IRS Form 990, its Charity Navigator record and its own reports, and every donation link was opened to confirm it works. Nothing here is paid for, and nothing is ranked on a single score.</p>

      <section class="how-block how-made" id="how-made" aria-labelledby="how-made-h">
        <h2 id="how-made-h">How it’s made</h2>
        <p>GiveChi is generated with AI and overseen by ${esc(SITE.steward)}. ${esc(SITE.madeWith)}, gathered the records, wrote the summaries and built the site. ${esc(SITE.steward)} sets its direction and reviews the work.</p>
        <p>AI can get things wrong. Each charity’s details link to the filings and sources behind its figures, so check the ones that matter to you before a large gift.</p>
      </section>

      <section class="how-block" aria-labelledby="how-num">
        <h2 id="how-num">What the numbers mean</h2>
        <dl class="defs">
          <div><dt>To programs</dt><dd>The share of spending that goes to programs, averaged over three years. The median here is ${RATIO_MEDIAN.toFixed(1)}%. It shows how spending is classified; the evidence tag shows whether the programs work.</dd></div>
          <div><dt>Charity Navigator score</dt><dd>${esc(BEACON_CAVEAT)}</dd></div>
          <div><dt>Spent a year</dt><dd>Total expenses from the latest readable filing. Size measures reach.</dd></div>
          <div><dt>Result</dt><dd>Revenue minus expenses in that year. A deficit is shown in red and explained under Worth knowing.</dd></div>
        </dl>
      </section>

      <section class="how-block" aria-labelledby="how-ev">
        <h2 id="how-ev">Evidence</h2>
        <ul class="tiers">${tierList}</ul>
      </section>

      <section class="how-block" aria-labelledby="how-caution">
        <h2 id="how-caution">Cautions</h2>
        <p>Every note on the record stays in. The ones that bear most on a gift (${CAUTION_KINDS.map((k) => FLAG_LABELS[k].toLowerCase()).join(', ')}) show on the cards; the rest wait in each charity’s details.</p>
      </section>

      <section class="how-block" id="how-small" aria-labelledby="how-small-h">
        <h2 id="how-small-h">Making a small gift count</h2>
        <dl class="defs">
          <div><dt>Ask if your employer matches it</dt><dd>Many employers match their staff’s gifts, often dollar for dollar. Check your benefits portal or ask HR before you give, then send the receipt in.</dd></div>
          <div><dt>Deduct it without itemizing</dt><dd>From the 2026 tax year, you can deduct up to $1,000 in cash gifts to charities like these, or $2,000 for a married couple filing jointly, even if you take the standard deduction. If you itemize, gifts count above 0.5% of your income. Gifts through donor-advised funds do not qualify for the new deduction.</dd></div>
          <div><dt>Give a little every month</dt><dd>Ten dollars a month is $120 a year, and a steady gift lets a charity plan staff and programs ahead. Each charity’s details say whether its form offers recurring gifts, and your saved list can add a reminder to your calendar.</dd></div>
          <div><dt>Give time</dt><dd>Where a charity takes volunteers, its details link to how to sign up.</dd></div>
        </dl>
        <p class="fine">Tax rules: ${external('https://www.fidelitycharitable.org/articles/obbb-tax-reform.html', 'Fidelity Charitable', ', on the 2026 changes')}. Check your own situation with a tax professional.</p>
      </section>

      <section class="how-block" id="how-safe" aria-labelledby="how-safe-h">
        <h2 id="how-safe-h">Giving safely</h2>
        <p>Every Donate button here goes to the charity’s own site or the payment platform it uses, each checked by hand. Anywhere else, these are the signs the Federal Trade Commission says to watch for.</p>
        <dl class="defs">
          <div><dt>Pressure to give right now</dt><dd>A real charity will still take your gift tomorrow. Scammers push for an answer on the spot.</dd></div>
          <div><dt>Cash, gift cards, wire transfers or crypto</dt><dd>Only scammers ask to be paid this way. A credit card or a check leaves a record you can dispute.</dd></div>
          <div><dt>A name that is almost right</dt><dd>Lookalike names borrow a known charity’s trust. Match the EIN to the one listed here, or look the charity up in the Illinois Attorney General’s registry.</dd></div>
        </dl>
        <p>To check a charity that is not listed here, look up its Form 990 on ${external('https://projects.propublica.org/nonprofits/', 'ProPublica Nonprofit Explorer', '')}, its Illinois registration in the ${external('https://charitable.illinoisattorneygeneral.gov/search', 'Attorney General’s charity registry', '')} and its rating, if it has one, on ${external('https://www.charitynavigator.org/', 'Charity Navigator', '')}.</p>
        <p class="fine">Warning signs: ${external('https://consumer.ftc.gov/features/how-donate-wisely-and-avoid-charity-scams', 'Federal Trade Commission', ', on charity scams')}.</p>
      </section>

      <section class="how-block" aria-labelledby="how-faq">
        <h2 id="how-faq">Questions</h2>
        <dl class="faq">${FAQ.map((f) => `<div${f.id ? ` id="${f.id}"` : ''}><dt>${esc(f.q)}</dt><dd>${esc(fill(f.a))}</dd></div>`).join('')}</dl>
      </section>

      <section class="how-block" aria-labelledby="how-src">
        <h2 id="how-src">Sources</h2>
        <ul class="sources">${SOURCES.map((s) => `<li><span>${esc(s.label)}</span>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.via)}<span class="sr-only">, opens in a new tab</span></a>` : `<span class="src-via">${esc(s.via)}</span>`}</li>`).join('')}</ul>
        <p class="fine">If a link is dead or a figure is wrong, it gets fixed.${SITE.contact ? ` Write to ${esc(SITE.contact)}.` : ''}</p>
      </section>

      <section class="how-block" id="how-photos" aria-labelledby="how-photos-h">
        <h2 id="how-photos-h">Photographs and logos</h2>
        <p>Each photograph shows a charity’s own work and is from Wikimedia Commons under a free license. Each is cropped for this site and shared under its original license.</p>
        <p>Each charity’s logo is its own, taken from its own website and shown only to identify it. Logos belong to their organizations, and no charity listed here endorses or sponsors GiveChi.</p>
        <ul class="sources credits">${ORGS.filter((o) => o.photo).map((o) => ({ ...o.photo, place: o.photo.caption })).map((p) => `<li><span>${esc(p.place)}</span><span class="src-via">${external(p.source, esc(p.artist), `, photo of ${esc(p.place)} on Wikimedia Commons`)}, ${p.licenseUrl ? external(p.licenseUrl, esc(p.license), ' license') : esc(p.license.toLowerCase())}</span></li>`).join('')}</ul>
      </section>
    </div>
  </section>`;

/* --- structured data --------------------------------------------------------------- */

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE.canonical}#website`, url: SITE.canonical, name: SITE.masthead, description: DESCRIPTION, inLanguage: 'en-US', author: { '@type': 'Person', name: SITE.steward } },
    {
      '@type': 'ItemList', '@id': `${SITE.canonical}#roster`, name: `Vetted Chicago charities, ${N} organizations`, numberOfItems: N,
      itemListElement: ORGS.map((o, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: {
          '@type': 'NGO', '@id': `${SITE.canonical}#${o.id}`, name: o.name, description: o.does, url: o.homepage,
          identifier: { '@type': 'PropertyValue', propertyID: 'EIN', value: o.ein },
          areaServed: { '@type': 'Place', name: o.serviceArea },
          potentialAction: { '@type': 'DonateAction', target: { '@type': 'EntryPoint', urlTemplate: o.donateUrl } }
        }
      }))
    },
    { '@type': 'FAQPage', '@id': `${SITE.canonical}#faq`, mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fill(f.a) } })) }
  ]
};
const jsonld = JSON.stringify(SCHEMA).replace(/</g, '\\u003c');

/* --- the page -------------------------------------------------------------------------- */

/* --- versioned assets ------------------------------------------------------------ */
/* GitHub Pages lets browsers cache files for ten minutes, so right after a
   deploy a returning visitor could run new HTML against old modules, and one
   missing export stops the whole app. Every script and stylesheet URL carries
   a hash of their contents, and an import map pins the modules' own imports
   to the same version, so one deploy's files are only ever used together. */

const ASSETS = ['js', 'data', 'css'].flatMap((d) => readdirSync(new URL(`./${d}/`, import.meta.url)).filter((f) => /\.(js|css)$/.test(f)).sort().map((f) => `${d}/${f}`));
const V = createHash('sha256').update(ASSETS.map((f) => readFileSync(new URL('./' + f, import.meta.url))).join('\0')).digest('hex').slice(0, 10);
const v = (f) => `${f}?v=${V}`;
const importMap = JSON.stringify({ imports: Object.fromEntries(ASSETS.filter((f) => f.endsWith('.js')).map((f) => [`./${f}`, `./${v(f)}`])) });

const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DHYN3S0XDC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DHYN3S0XDC');
</script>
<meta name="theme-color" content="#E8F5FC">
<meta name="color-scheme" content="light">
<script>document.documentElement.classList.add('js');addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='SCRIPT'&&t.type==='module')document.documentElement.classList.remove('js')},true);addEventListener('load',function(){var r=document.documentElement;if(!r.classList.contains('app-ready'))r.classList.remove('js')});</script>
<title>${esc(SITE.name)}</title>
<meta name="description" content="${esc(DESCRIPTION)}">
<meta name="author" content="${esc(SITE.steward)}">
<link rel="canonical" href="${esc(SITE.canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.masthead)}">
<meta property="og:title" content="${esc(SITE.title)}">
<meta property="og:description" content="${esc(DESCRIPTION)}">
<link rel="icon" href="favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="mask-icon" href="mask-icon.svg" color="#E4002B">
<link rel="preload" href="fonts/league-gothic-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${v('css/tokens.css')}">
<link rel="stylesheet" href="${v('css/base.css')}">
<link rel="stylesheet" href="${v('css/app.css')}">
<script type="importmap">${importMap}</script>
<link rel="modulepreload" href="${v('js/core.js')}">
<link rel="modulepreload" href="${v('js/saved.js')}">
<link rel="modulepreload" href="${v('data/orgs.js')}">
<link rel="modulepreload" href="${v('data/meta.js')}">
<link rel="modulepreload" href="${v('data/events.js')}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <div class="nav-in">
    <a class="brand" href="#home" data-route="/"><span class="brand-word">${esc(SITE.masthead)}</span>${stars()}<span class="sr-only">, home</span></a>
    <nav class="nav-links" aria-label="Site">
      <a href="#how" data-route="/how">How we check</a>
      <a href="#all" data-route="/all">All ${N} charities</a>
    </nav>
    <button class="saved-open js-only" type="button" id="saved-open" aria-haspopup="dialog">Saved <span class="saved-n" id="saved-n">0</span></button>
  </div>
</header>

<main id="main" tabindex="-1">
${home}
${fit}
${all}
${how}
</main>

<footer class="foot">
  <div class="wrap flagband" aria-hidden="true">${stars()}</div>
  <div class="wrap foot-in">
    <p class="foot-brand"><span class="brand-word">${esc(SITE.masthead)}</span><span class="foot-city">Made in Chicago, for Chicago</span></p>
    <p>${N} charities, checked ${esc(VERIFIED)}. No money taken, no donations processed, and no tie to any organization listed. Visits are counted with Google Analytics.<span class="foot-made">Generated with AI and overseen by ${esc(SITE.steward)}. <a href="#how-made">How it’s made</a></span></p>
  </div>
</footer>

<dialog class="panel" id="detail" aria-labelledby="detail-h"></dialog>
<dialog class="panel" id="saved" aria-labelledby="saved-h"></dialog>
<div id="announcer" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>

<script type="application/ld+json">${jsonld}</script>
<script type="module" src="${v('js/app.js')}"></script>
</body>
</html>
`;

writeFileSync(new URL('./index.html', import.meta.url), html);
console.log(`index.html: ${(html.length / 1024).toFixed(0)} KB, ${N} organizations`);
