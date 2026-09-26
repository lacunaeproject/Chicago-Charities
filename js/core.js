/* CORE: data, formats, the matcher and every piece of markup. One module,
   imported by build.mjs (to pre-render the page) and by app.js (to render
   views live), so the static page and the running one cannot drift. Every
   figure comes from data/orgs.js; nothing here is invented. */

import { ORGS } from '../data/orgs.js';
import { LOGOS } from '../data/logos.js';
import { CAUSES, EVIDENCE_TIERS, FLAG_LABELS, VERIFIED_AS_OF, FAQ, SOURCES, SITE, BEACON_CAVEAT } from '../data/meta.js';

export { ORGS, CAUSES, EVIDENCE_TIERS, FLAG_LABELS, VERIFIED_AS_OF, FAQ, SOURCES, SITE, BEACON_CAVEAT };

/* --- formats ----------------------------------------------------------- */

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function money(n) {
  if (n === null || n === undefined || n < 0) return null;
  const abs = Math.abs(n);
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(abs >= 1e8 ? 0 : 1)}M`;
  if (abs >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${n}`;
}
export function signedMoney(n) {
  const m = money(Math.abs(n));
  return n < 0 ? `−${m}` : `+${m}`;
}
export const pct = (r) => (r === null || r === undefined ? null : `${Number(r).toFixed(1)}%`);
const ordinal = (n) => { const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
export const longDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
export const hostOf = (u) => new URL(u).hostname.replace(/^www\./, '');
const siteOf = (u) => hostOf(u).split('.').slice(-2).join('.');
export const plural = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;

/* --- the collection ---------------------------------------------------- */

export const byId = new Map(ORGS.map((o) => [o.id, o]));
export const causeOf = (id) => CAUSES.find((c) => c.id === id);
export const inCause = (c) => ORGS.filter((o) => o.causes.includes(c));
export const NEIGHBORHOODS = [...new Set(ORGS.flatMap((o) => o.neighborhoods))].sort();
const sortKey = (o) => o.name.replace(/^(The|A)\s+/i, '').toLowerCase();

const SPEND_RANKED = ORGS.filter((o) => o.financials && o.financials.expenses > 0)
  .sort((a, b) => b.financials.expenses - a.financials.expenses);
const RATIOS = ORGS.map((o) => o.vetting.programExpenseRatio).filter((r) => r != null).sort((a, b) => a - b);
export const RATIO_MEDIAN = RATIOS.length % 2
  ? RATIOS[(RATIOS.length - 1) / 2]
  : (RATIOS[RATIOS.length / 2 - 1] + RATIOS[RATIOS.length / 2]) / 2;
export const TOTAL_SPEND = SPEND_RANKED.reduce((s, o) => s + o.financials.expenses, 0);

/* The cautions that bear on the gift show on cards and rows; entity, link
   and data notes wait in the details. */
export const CAUTION_KINDS = ['deficit', 'funding-risk', 'labor', 'audit', 'incident'];
export const cautions = (o) => o.flags.filter((f) => CAUTION_KINDS.includes(f.kind));
const hasDeficit = (o) => o.flags.some((f) => f.kind === 'deficit');
const TIER = (o) => EVIDENCE_TIERS[o.evidence.strength];

/* --- the matcher ------------------------------------------------------- */

export const PRIORITIES = [
  { id: 'proven', label: 'Proven results', hint: 'Outside evidence the program works' },
  { id: 'dollar', label: 'Most of my dollar', hint: 'Highest share spent on programs' },
  { id: 'steady', label: 'Steady finances', hint: 'No recent deficits, strong rating' },
  { id: 'local',  label: 'Small and local', hint: 'Neighborhood groups where a gift shows' },
  { id: 'reach',  label: 'Biggest reach', hint: 'Large operations serving the most people' }
];
export const SORTS = [{ id: 'az', label: 'A to Z' }, ...PRIORITIES];

const WIDE = new Set(['Citywide', 'Countywide', 'Regional', 'Statewide', 'Multi-region', 'National']);
const LOCAL = new Set(['Neighborhood', 'Multi-neighborhood']);
const num = (v, none) => (v === null || v === undefined ? none : v);
const RANK = {
  az:     (a, b) => sortKey(a).localeCompare(sortKey(b)),
  proven: (a, b) => TIER(b).rank - TIER(a).rank || cautions(a).length - cautions(b).length || num(b.vetting.programExpenseRatio, 0) - num(a.vetting.programExpenseRatio, 0),
  dollar: (a, b) => num(b.vetting.programExpenseRatio, -1) - num(a.vetting.programExpenseRatio, -1),
  steady: (a, b) => hasDeficit(a) - hasDeficit(b) || num(b.vetting.cnScore, -1) - num(a.vetting.cnScore, -1) || num(b.vetting.programExpenseRatio, 0) - num(a.vetting.programExpenseRatio, 0),
  local:  (a, b) => LOCAL.has(b.scale) - LOCAL.has(a.scale) || num(a.financials?.expenses, 9e12) - num(b.financials?.expenses, 9e12),
  reach:  (a, b) => num(b.financials?.expenses, -1) - num(a.financials?.expenses, -1)
};

/* A neighborhood matches an organization that lists it, or one that works
   across the whole city or wider: those serve it too. */
export const servesHood = (o, hood) => !hood || o.neighborhoods.includes(hood) || WIDE.has(o.scale);

export function rank({ cause = null, priority = 'proven', hood = null } = {}) {
  return ORGS.filter((o) => (!cause || o.causes.includes(cause)) && servesHood(o, hood))
    .sort((a, b) => (RANK[priority] || RANK.proven)(a, b) || RANK.az(a, b));
}

/* Why this one ranks where it does, in the priority's own terms. */
export function reason(o, priority) {
  const t = TIER(o);
  switch (priority) {
    case 'proven': return o.evidence.strength === 'self-reported' ? 'Results counted by the organization itself' : `${t.label}: ${t.brief}`;
    case 'dollar': return o.vetting.programExpenseRatio == null ? 'No program ratio published' : `${pct(o.vetting.programExpenseRatio)} of spending reaches programs`;
    case 'steady': return `${hasDeficit(o) ? 'Has a recent deficit' : 'No recent deficit'}${o.vetting.cnScore != null ? ` · rated ${o.vetting.cnScore}/100` : ''}`;
    case 'local':  return o.neighborhoods.length ? o.neighborhoods.slice(0, 3).join(', ') + (o.neighborhoods.length > 3 ? ' and more' : '') : `Works ${o.scale.toLowerCase()}`;
    case 'reach':  return o.financials?.expenses ? `${money(o.financials.expenses)} spent a year` : 'No expense figure filed yet';
    default: return '';
  }
}

/* --- icons ------------------------------------------------------------- */

const ICON = {
  food: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/>',
  education: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>',
  housing: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  legal: '<path d="M12 3v18M5 21h14M4 7h16"/><path d="M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
  youth: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  jobs: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  health: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/><path d="M9.5 11h5M12 8.5v5"/>',
  women: '<circle cx="12" cy="7" r="3.5"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  environment: '<path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
  any: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  proven: '<path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 15h9"/>',
  dollar: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3.2 6 1.8 6 5 0 1.4-1.3 2.7-3 2.7s-3-1-3-2.5M12 5.5v13"/>',
  steady: '<path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/>',
  local: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  reach: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="10"/>',
  az: '<path d="M4 18l4-12 4 12M5.5 14h5M14 6h6l-6 12h6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  save: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  link: '<path d="M7 17L17 7M9 7h8v8"/>'
};
export const icon = (k, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON[k] || ''}</svg>`;
const STAR_PATH = 'M12 0 L14.4 7.843 L22.392 6 L16.8 12 L22.392 18 L14.4 16.157 L12 24 L9.6 16.157 L1.608 18 L7.2 12 L1.608 6 L9.6 7.843 Z';
export const star = () => `<svg class="star" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${STAR_PATH}"/></svg>`;
/* A charity's own work, photographed: free-licensed images of its programs,
   people or place (see data/orgs.js). Where none exists, the card shows the
   charity's logo instead, and the cause's icon if there is no logo either.
   `credit` adds the author and license under it. */
const licenseLink = (ph) => ph.licenseUrl
  ? `<a href="${esc(ph.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(ph.license)}<span class="sr-only">, opens in a new tab</span></a>`
  : esc(ph.license.toLowerCase());
/* Each charity's own logo, from its own site, shown only to identify it
   (see data/logos.js). Decorative next to the name, so alt is empty. */
export function logo(o, cls) {
  const l = LOGOS[o.id];
  if (!l) return `<div class="org-ph ${cls}" aria-hidden="true">${icon(o.primaryCause, 'ico')}</div>`;
  return `<div class="org-logo ${cls}${l.dark ? ' is-dark' : ''}"><img src="img/logos/${esc(o.id)}.webp" width="${l.w}" height="${l.h}" alt="" loading="lazy" decoding="async"></div>`;
}
export function orgPhoto(o, cls, sizes, credit = false) {
  const ph = o.photo;
  if (!ph) return logo(o, cls);
  const base = `img/orgs/${o.id}`;
  return `<figure class="org-photo ${cls}">
      <img src="${base}-1280.webp" srcset="${base}-640.webp 640w, ${base}-1280.webp 1280w" sizes="${sizes}" width="${ph.w}" height="${ph.h}" alt="${esc(ph.alt)}" loading="lazy" decoding="async">
      ${credit ? `<figcaption>${esc(ph.caption)}<span class="photo-by"> · Photo: ${esc(ph.artist)}, ${licenseLink(ph)}</span></figcaption>` : ''}
    </figure>`;
}
export const stars = (n = 4) => `<span class="stars" aria-hidden="true">${star().repeat(n)}</span>`;

/* --- small parts --------------------------------------------------------- */

export const external = (href, text, sr = '') =>
  `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${text}<span class="sr-only">${sr}, opens in a new tab</span></a>`;
export const donateLink = (o, cls = 'btn btn-primary', text = 'Donate') =>
  `<a class="${cls}" href="${esc(o.donateUrl)}" target="_blank" rel="noopener noreferrer">${text} <span class="arrow" aria-hidden="true">↗</span><span class="sr-only"> to ${esc(o.name)}, opens ${esc(hostOf(o.donateUrl))} in a new tab</span></a>`;
export const saveButton = (o, cls = 'save') =>
  `<button class="${cls} js-only" type="button" data-save="${esc(o.id)}" aria-pressed="false">${icon('save', 'ico save-ico')}<span class="save-t">Save</span><span class="sr-only"> ${esc(o.name)} to your list</span></button>`;
const tierBadge = (o, cls = 'ev') => { const t = TIER(o); return `<span class="${cls} ev-${t.rank}">${esc(t.label)}</span>`; };
/* A caution names its kinds in the line itself ("Cautions: finances, labor
   record") and opens a card with the full notes: on hover for a mouse, on
   press for touch and keys. The card is a native popover, so it opens even
   without script; app.js adds the hover and places it beside the line.
   `ctx` keeps ids unique where one charity shows in two views at once. */
const FLAG_ORDER = ['deficit', 'audit', 'incident', 'funding-risk', 'labor', 'data-quality', 'link', 'entity'];
const byFlagOrder = (a, b) => FLAG_ORDER.indexOf(a.kind) - FLAG_ORDER.indexOf(b.kind);
export function cautionTip(o, ctx) {
  const cs = cautions(o).sort(byFlagOrder);
  if (!cs.length) return '';
  const id = `tip-${ctx}-${o.id}`;
  const kinds = cs.map((f) => (FLAG_LABELS[f.kind] || f.kind).toLowerCase()).join(', ');
  return `<button class="caution" type="button" popovertarget="${esc(id)}" data-tip="${esc(id)}"><span class="caution-t">${cs.length === 1 ? 'Caution' : 'Cautions'}: ${esc(kinds)}</span><span class="sr-only">, ${esc(o.name)}</span></button>
    <div class="tip" id="${esc(id)}" popover role="group" aria-label="${plural(cs.length, 'caution')} for ${esc(o.name)}">
      <ul class="tip-list">${cs.map((f) => `<li><span class="tip-k">${esc(FLAG_LABELS[f.kind] || f.kind)}</span><p>${esc(f.note)}</p></li>`).join('')}</ul>
      <button class="tip-more js-only" type="button" data-org="${esc(o.id)}" data-at="w-h">See details and sources<span class="sr-only"> for ${esc(o.name)}</span> <span aria-hidden="true">→</span></button>
    </div>`;
}
/* "To programs" explains itself in place: the label opens a card with this
   charity's own figure in plain words, through the same popover machinery
   as a caution line. */
export function termTip(o, ctx, label = 'to programs') {
  const id = `term-${ctx}-${o.id}`;
  const v = o.vetting, r = v.programExpenseRatio;
  const body = r == null
    ? `<p>The share of a charity’s spending that goes to its programs, rather than to management and fundraising. ${esc(o.name)} has no published figure.</p>`
    : `<p>Of every dollar ${esc(o.name)} spent, about ${Math.round(r)} cents went to its programs: the services themselves. The rest paid for management and fundraising.</p>
      <p>This is a ${esc(v.ratioBasis || 'average')}${v.ratioYears ? ` (${esc(v.ratioYears)})` : ''} from its IRS filings. The median here is ${RATIO_MEDIAN.toFixed(1)}%.</p>
      <p>Higher is not automatically better: staff, audits and data are what make programs work. This shows how spending is classified; the evidence tag shows whether the programs work.</p>`;
  return `<button class="term" type="button" popovertarget="${esc(id)}" data-tip="${esc(id)}">${label}<span class="sr-only">: what this means for ${esc(o.name)}</span></button>
    <div class="tip tip-term" id="${esc(id)}" popover role="group" aria-label="What “to programs” means">
      <p class="tip-h">What “to programs” means</p>${body}
    </div>`;
}
const figures = (o, cls = 'figs', ctx = 'f') => `<dl class="${cls}">
    <div><dt>${termTip(o, ctx)}</dt><dd>${pct(o.vetting.programExpenseRatio) || '<span aria-hidden="true">—</span><span class="sr-only">not published</span>'}</dd></div>
    <div><dt>spent a year</dt><dd>${money(o.financials?.expenses) || '<span aria-hidden="true">—</span><span class="sr-only">not filed</span>'}</dd></div>
  </dl>`;

/* --- a result card --------------------------------------------------------- */

export function card(o, i, priority) {
  return `<article class="card${i === 0 ? ' is-first' : ''}" aria-labelledby="c-${esc(o.id)}">
    ${orgPhoto(o, 'card-photo', '(max-width: 960px) 100vw, 360px')}
    <div class="card-top"><span class="badge">${i === 0 ? star() + ' Best fit' : `No. ${i + 1}`}</span>${saveButton(o, 'save save-icon')}</div>
    <h3 class="card-name" id="c-${esc(o.id)}"><a href="${esc(o.homepage)}" data-org="${esc(o.id)}">${esc(o.name)}</a></h3>
    <p class="card-does">${esc(o.short)}</p>
    <p class="card-why">${esc(reason(o, priority))}</p>
    ${figures(o, 'figs', 'c')}
    ${cautionTip(o, 'c')}
    ${o.donateConfirmed === false ? '<span class="form-warn">Payment form not confirmed. See details.</span>' : ''}
    <div class="card-go">${donateLink(o)}<button class="btn js-only" type="button" data-org="${esc(o.id)}">Details<span class="sr-only"> on ${esc(o.name)}</span></button></div>
  </article>`;
}

/* --- a row in the full list --------------------------------------------- */

export function row(o) {
  return `<li class="row" data-id="${esc(o.id)}">
    ${logo(o, 'row-photo')}
    <div class="row-text">
      <h3 class="row-name"><a href="${esc(o.homepage)}" data-org="${esc(o.id)}">${esc(o.name)}</a></h3>
      <p class="row-does">${esc(o.short)}</p>
      ${cautionTip(o, 'r')}
    </div>
    ${figures(o, 'figs row-figs', 'r')}
    ${donateLink(o, 'row-donate no-js', 'Donate')}
    <span class="chev js-only" aria-hidden="true"></span>
  </li>`;
}

/* --- the details panel ------------------------------------------------------ */

function stat(label, value, note, cls = '') {
  return `<div class="stat${cls}"><dt>${label}</dt><dd class="stat-v">${value}</dd>${note ? `<dd class="stat-note">${note}</dd>` : ''}</div>`;
}
const NONE = (sr) => `<span aria-hidden="true">—</span><span class="sr-only">${sr}</span>`;

function stats(o) {
  const v = o.vetting, f = o.financials, out = [];
  out.push(v.programExpenseRatio != null
    ? stat(termTip(o, 'd', 'To programs'), pct(v.programExpenseRatio), `Median here is ${RATIO_MEDIAN.toFixed(1)}%.`)
    : stat(termTip(o, 'd', 'To programs'), NONE('Not published'), 'No program ratio published.', ' is-none'));
  out.push(v.cnScore == null
    ? stat('Charity Navigator', NONE('Unrated'), o.entity === 'private-operating-foundation' ? 'Private foundations are not rated.' : 'Profiled, but not yet rated.', ' is-none')
    : stat('Charity Navigator', `${v.cnScore}<span class="stat-of">/100</span>`, `Assessed on ${v.beaconsComplete} of ${v.beaconsTotal} measures.`));
  if (f && f.expenses > 0) {
    const i = SPEND_RANKED.findIndex((x) => x.id === o.id), n = SPEND_RANKED.length;
    out.push(stat(`Spent, ${esc(f.fiscalYear)}`, money(f.expenses), i === 0 ? 'The largest here.' : i === n - 1 ? 'The smallest here.' : `${ordinal(i + 1)} largest of ${n}.`));
  } else {
    out.push(stat('Spent a year', NONE('Not filed'), 'No expense figure filed yet.', ' is-none'));
  }
  if (f && f.result != null) {
    out.push(stat(`Result, ${esc(f.fiscalYear)}`, signedMoney(f.result), f.revenue ? `On ${money(f.revenue)} of revenue.` : '', f.result < 0 ? ' is-deficit' : ''));
  }
  return `<dl class="stats">${out.join('')}</dl>`;
}

const giveDest = (o) => siteOf(o.donateUrl) !== siteOf(o.homepage)
  ? `Opens a payment page on ${esc(hostOf(o.donateUrl))}, a donation platform.`
  : `Opens ${esc(hostOf(o.donateUrl))}, the organization’s own site.`;
const propublica = (o) => `https://projects.propublica.org/nonprofits/organizations/${o.ein.replace('-', '')}`;
const source = (url, ctx) => url ? ` <span class="src">Source: ${external(url, esc(hostOf(url)), `, ${ctx}`)}</span>` : '';

export function detail(o) {
  const c = causeOf(o.primaryCause), t = TIER(o);
  const flags = [...o.flags].sort(byFlagOrder);
  const onFile = [
    ...(o.aka && o.aka.length ? [['Also known as', esc(o.aka.join(', '))]] : []),
    ['Founded', o.founded ? String(o.founded) : 'Not published'],
    ['EIN', esc(o.ein)],
    ['Checked', longDate(o.verified)]
  ];
  return `
  <div class="panel-head">
    <span class="tag">${icon(c.id, 'ico ico-xs')}${esc(c.short)}</span>
    <button class="panel-close" type="button" data-close>${icon('close', 'ico ico-sm')}<span class="sr-only">Close details</span></button>
  </div>
  <div class="panel-body">
    ${o.photo ? orgPhoto(o, 'panel-photo', '(max-width: 720px) 100vw, 560px', true) : ''}
    <div class="panel-id">${LOGOS[o.id] ? logo(o, 'panel-logo') : ''}<h2 class="panel-name" id="detail-h" tabindex="-1">${esc(o.name)}</h2></div>
    <p class="panel-does">${esc(o.does)}</p>
    <div class="panel-go">${donateLink(o)}${saveButton(o, 'btn save save-btn')}</div>
    <p class="panel-dest">${o.donateConfirmed === false ? '<strong class="warn">Payment form not confirmed.</strong> ' : ''}${giveDest(o)}${o.recurring ? ' Its form offers recurring gifts.' : ''}${o.donateNote ? ' ' + esc(o.donateNote) : ''}</p>
    ${o.giftExample ? `<p class="gift-eg"><span class="gift-amt">$${esc(o.giftExample.amount)}</span> <span>${esc(o.giftExample.provides)}, by the charity’s own figures.${source(o.giftExample.source, 'gift example')}</span></p>` : ''}
    ${o.entityNote ? `<div class="before"><h3>Before you give</h3><p>${esc(o.entityNote)}</p></div>` : ''}

    <p class="panel-why">${esc(o.whyItMatters)}</p>
    ${stats(o)}

    ${flags.length ? `<section class="block" aria-labelledby="w-h">
      <h3 class="block-h" id="w-h">Worth knowing <span class="count-badge">${flags.length}</span></h3>
      <ul class="flags">${flags.map((f) => `<li class="flag${CAUTION_KINDS.includes(f.kind) ? ' is-caution' : ''}">
        <span class="flag-k">${esc(FLAG_LABELS[f.kind] || f.kind)}</span>
        <p>${esc(f.note)}${source(f.source, `${(FLAG_LABELS[f.kind] || f.kind).toLowerCase()} note`)}</p></li>`).join('')}</ul>
    </section>` : ''}

    <section class="block" aria-labelledby="e-h">
      <h3 class="block-h" id="e-h">Evidence ${tierBadge(o)}</h3>
      <p>${esc(o.evidence.claim)}.</p>
      <p class="fine">Period: ${esc(o.evidence.period)}.${source(o.evidence.source, 'evidence')}</p>
      <p class="fine">${esc(t.gloss)}</p>
    </section>

    <section class="block" aria-labelledby="where-h">
      <h3 class="block-h" id="where-h">Where it works</h3>
      ${o.neighborhoods.length ? `<ul class="places">${o.neighborhoods.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
      <p>${esc(o.serviceArea)}.</p>
    </section>

    ${o.volunteerUrl ? `<section class="block" aria-labelledby="v-h">
      <h3 class="block-h" id="v-h">Give time</h3>
      <p>${esc(o.name)} takes volunteers. ${external(o.volunteerUrl, 'See how to volunteer', ` with ${esc(o.name)}`)}</p>
    </section>` : ''}

    <section class="block" aria-labelledby="f-h">
      <h3 class="block-h" id="f-h">On file</h3>
      <dl class="onfile">${onFile.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${o.foundedNote ? `<p class="fine">${esc(o.foundedNote)}</p>` : ''}
      <p class="fine">${o.entity === 'private-operating-foundation' ? 'IRS Form 990-PF' : 'IRS Form 990'}${o.financials ? `, ${esc(o.financials.fiscalYear)}` : ''}.${source(propublica(o), 'Form 990')}</p>
      <p class="panel-links">${external(o.homepage, 'Their website', `: ${esc(o.name)}`)}${o.vetting.cnUrl ? external(o.vetting.cnUrl, 'Charity Navigator profile', `: ${esc(o.name)}`) : ''}</p>
    </section>
  </div>`;
}

/* --- the saved list ------------------------------------------------------- */

export function savedItem(o) {
  return `<li class="saved-item" data-id="${esc(o.id)}">
    <div class="saved-text"><h3><a href="${esc(o.homepage)}" data-org="${esc(o.id)}">${esc(o.name)}</a></h3><p>${esc(o.short)}</p>
      <p class="saved-figs">${pct(o.vetting.programExpenseRatio) ? `${pct(o.vetting.programExpenseRatio)} to programs · ` : ''}${money(o.financials?.expenses) ? `${money(o.financials.expenses)} a year` : 'No expense figure filed'}</p>
      ${cautionTip(o, 's')}</div>
    <div class="saved-go">${donateLink(o, 'btn btn-primary btn-sm')}<button class="btn btn-sm" type="button" data-remove="${esc(o.id)}">Remove<span class="sr-only"> ${esc(o.name)}</span></button></div>
  </li>`;
}
