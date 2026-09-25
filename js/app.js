/* APP: turns the pre-rendered page into views.

   Routes live in the hash, so Back, Forward, reload and shared links all
   land on the exact view:
     #/                          home (the question)
     #/fit/<cause>?p=&near=      three good fits
     #/all?cause=&sort=&near=    every charity
     #/how                       how we check
   Any route can carry &org=<id> (the details panel is open over it) or, on
   home, ?give=<ids> (a shared list is open). */

import {
  ORGS, CAUSES, SITE, PRIORITIES, SORTS, NEIGHBORHOODS, byId, causeOf, rank, card, detail, savedItem, icon, esc, plural
} from './core.js';
import * as saved from './saved.js';
import { announce } from './announce.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const VIEWS = ['home', 'fit', 'all', 'how'];
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const ms = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
const WORD = ['No', 'One', 'Two', 'Three'];

/* --- routing ------------------------------------------------------------------ */

function parse(hash = location.hash) {
  const h = hash.replace(/^#/, '');
  // Hashes the page uses without script, and old anchors.
  if (!h || h === 'home' || h === 'main') return { view: 'home', params: new URLSearchParams() };
  if (h === 'all') return { view: 'all', params: new URLSearchParams() };
  if (h === 'how' || h === 'how-we-vetted' || h === 'how-made' || h === 'how-safe' || h === 'how-small') return { view: 'how', params: new URLSearchParams(), anchor: h === 'how' ? null : h };
  const g = h.match(/^all-([a-z]+)$/);
  if (g && causeOf(g[1])) return { view: 'fit', cause: g[1], params: new URLSearchParams() };
  if (!h.startsWith('/')) return null;               // an ordinary in-page anchor
  const [path, query = ''] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);
  if (parts[0] === 'fit') return { view: 'fit', cause: parts[1] && (parts[1] === 'any' || causeOf(parts[1])) ? parts[1] : 'any', params };
  if (parts[0] === 'all') return { view: 'all', params };
  if (parts[0] === 'how') return { view: 'how', params };
  return { view: 'home', params };
}

function href(route) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(route.params || {})) if (v) p.set(k, v);
  const q = p.toString();
  const path = route.view === 'home' ? '/' : route.view === 'fit' ? `/fit/${route.cause || 'any'}` : `/${route.view}`;
  return `#${path}${q ? '?' + q : ''}`;
}

/* pushState and replaceState fire no hashchange, so go() renders itself;
   Back, Forward and typed hashes arrive through hashchange. */
function go(route, { replace = false, transition = false } = {}) {
  const url = href(route);
  if (url === location.hash) return render();
  const apply = () => {
    if (replace) history.replaceState(history.state, '', url); else history.pushState({ app: true }, '', url);
    render({ moved: true });
  };
  if (transition && document.startViewTransition && !reduced()) document.startViewTransition(apply);
  else apply();
}
addEventListener('hashchange', () => render({ moved: true }));

/* The current route as a plain object, to modify and pass to go(). */
function current() {
  const r = parse() || { view: 'home', params: new URLSearchParams() };
  return { view: r.view, cause: r.cause, params: Object.fromEntries(r.params) };
}

/* --- rendering --------------------------------------------------------------------- */

let lastView = null;
let lastKey = '';
let viewTitle = SITE.name;
function render({ moved = false } = {}) {
  const r = parse();
  if (!r) return;                                     // plain anchor: let the browser scroll
  // An old or no-script anchor (#all-food, #how) becomes its route, in place.
  if (location.hash && !location.hash.startsWith('#/')) {
    history.replaceState(null, '', href({ view: r.view, cause: r.cause, params: Object.fromEntries(r.params) }));
  }
  const view = r.view;
  VIEWS.forEach((v) => { const el = document.getElementById(v); if (el) el.hidden = v !== view; });
  $$('.nav-links a').forEach((a) => { if (a.dataset.route === '/' + view) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });

  /* Opening or closing the details changes only &org: the view under the
     panel stays as it is, so its controls, focus and motion do not replay. */
  const rest = new URLSearchParams(r.params); rest.delete('org'); rest.delete('give');
  const key = `${view}|${r.cause || ''}|${rest}`;
  if (key !== lastKey) {
    const focused = document.activeElement && document.activeElement.id;
    if (view === 'fit') renderFit(r);
    if (view === 'all') renderAll(r);
    // A pill re-renders the view it sits in; the reader stays on that pill.
    if (focused && view === lastView) document.getElementById(focused)?.focus({ preventScroll: true });
    lastKey = key;
  }
  if (view === 'home') viewTitle = SITE.name;
  if (view === 'how') viewTitle = `How we check · ${SITE.masthead}`;

  const viewChanged = view !== lastView;
  lastView = view;
  if (moved && viewChanged) {
    window.scrollTo(0, 0);
    const h = $(`#${view} h1`);
    if (h) h.focus({ preventScroll: true });
  }
  if (r.anchor) document.getElementById(r.anchor)?.scrollIntoView();

  syncDetail(r.params.get('org'));
  const open = r.params.get('org') && byId.get(r.params.get('org'));
  document.title = open ? `${open.name} · ${SITE.masthead}` : viewTitle;
  syncShared(view === 'home' ? r.params.get('give') : null);
  syncSaveButtons();
}

/* --- results ------------------------------------------------------------------------ */

const priorityOf = (id) => PRIORITIES.find((p) => p.id === id) ? id : 'proven';
const hoodOf = (h) => (NEIGHBORHOODS.includes(h) ? h : null);

function select(id, label, options, value, ico, name) {
  return `<label class="pill"${name ? ` style="view-transition-name: ${name}"` : ''}>${icon(ico)}<span class="sr-only">${label}</span>
    <select id="${id}">${options.map(([v, t]) => `<option value="${esc(v)}"${v === value ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`;
}
const causeOptions = (anyLabel) => [['any', anyLabel], ...CAUSES.map((c) => [c.id, c.short])];
const hoodOptions = [['', 'Anywhere in Chicago'], ...NEIGHBORHOODS.map((n) => [n, n])];

function renderFit(r) {
  const cause = r.cause === 'any' ? null : r.cause;
  const c = cause ? causeOf(cause) : null;
  const priority = priorityOf(r.params.get('p'));
  const hood = hoodOf(r.params.get('near'));
  const all = rank({ cause, priority, hood });
  const top = all.slice(0, 3);
  const p = PRIORITIES.find((x) => x.id === priority);
  const n = top.length;
  const head = n === 0 ? 'No good fits yet.' : `${WORD[n]} good fit${n === 1 ? '' : 's'}${c ? ` for <em>${esc(c.short.toLowerCase())}</em>` : ''}.`;

  $('#fit-body').innerHTML = `<div class="fit-in">
    <h1 class="view-h" id="fit-h" tabindex="-1">${head}</h1>
    <div class="refine" role="group" aria-label="Your answers">
      ${select('f-cause', 'Cause', causeOptions('Every cause'), r.cause || 'any', c ? c.id : 'any', `cause-${c ? c.id : 'any'}`)}
      ${select('f-p', 'What matters most', PRIORITIES.map((x) => [x.id, x.label]), priority, priority)}
      ${select('f-near', 'Neighborhood', hoodOptions, hood || '', 'local')}
      <a class="link" href="#/" data-home>Start over</a>
    </div>
    ${n ? `<div class="cards">${top.map((o, i) => card(o, i, priority)).join('')}</div>` : `<div class="fit-empty"><p>Nothing ${c ? `in ${esc(c.short.toLowerCase())} ` : ''}lists ${esc(hood)} or works citywide.</p><p><button class="link" type="button" data-clear-near>Show charities anywhere in Chicago</button></p></div>`}
    <div class="after">
      ${all.length > n ? `<a class="link" href="${href({ view: 'all', params: { cause, sort: priority, near: hood } })}">See all ${all.length} that fit</a>` : ''}
      <a class="link" href="#/how">How we check these</a>
    </div>
  </div>`;

  const update = (patch) => {
    const cur = current();
    const next = { view: 'fit', cause: patch.cause ?? cur.cause, params: { p: priority !== 'proven' ? priority : '', near: hood || '', ...patch.params } };
    go(next, { replace: true, transition: true });
  };
  $('#f-cause').onchange = (e) => update({ cause: e.target.value });
  $('#f-p').onchange = (e) => update({ params: { p: e.target.value === 'proven' ? '' : e.target.value } });
  $('#f-near').onchange = (e) => update({ params: { near: e.target.value } });
  const clearNear = $('[data-clear-near]');
  if (clearNear) clearNear.onclick = () => update({ params: { near: '' } });

  viewTitle = `${c ? c.short : 'Every cause'}: best for ${p.label.toLowerCase()} · ${SITE.masthead}`;
  if (n) announce(`${head.replace(/<[^>]+>/g, '')} Ranked by ${p.label.toLowerCase()}${hood ? ` near ${hood}` : ''}. ${top[0].name} is the best fit.`);
}

/* --- the full list ---------------------------------------------------------------------- */

let rowsByGroup = null;   // the pre-rendered grouping, kept to restore it
function renderAll(r) {
  const causeParam = r.params.get('cause');
  const cause = causeOf(causeParam) ? causeParam : null;
  const sort = SORTS.find((s) => s.id === r.params.get('sort')) ? r.params.get('sort') : 'az';
  const hood = hoodOf(r.params.get('near'));
  const list = $('#all-list');

  if (!rowsByGroup) rowsByGroup = $$('.group', list).map((g) => ({ g, ul: $('.rows', g), rows: $$('.row', g) }));
  const refine = $('#all-refine');
  refine.innerHTML = `
    ${select('a-cause', 'Cause', causeOptions('All causes'), cause || 'any', cause || 'any')}
    ${select('a-sort', 'Sort', SORTS.map((s) => [s.id, s.id === 'az' ? 'A to Z' : s.label]), sort, sort)}
    ${select('a-near', 'Neighborhood', hoodOptions, hood || '', 'local')}`;
  refine.setAttribute('role', 'group');
  refine.setAttribute('aria-label', 'Filter and sort');
  const update = (patch) => { const cur = current(); go({ view: 'all', params: { cause, sort: sort === 'az' ? '' : sort, near: hood, ...cur.params, ...patch } }, { replace: true }); };
  $('#a-cause').onchange = (e) => update({ cause: e.target.value === 'any' ? '' : e.target.value });
  $('#a-sort').onchange = (e) => update({ sort: e.target.value === 'az' ? '' : e.target.value });
  $('#a-near').onchange = (e) => update({ near: e.target.value });

  const grouped = !cause && !hood && sort === 'az';
  list.classList.toggle('all-flat', !grouped);
  if (grouped) {
    rowsByGroup.forEach(({ g, ul, rows }) => { g.hidden = false; rows.forEach((row) => { row.hidden = false; ul.appendChild(row); }); });
  } else {
    const ranked = rank({ cause, priority: sort, hood });
    const [first, ...rest] = rowsByGroup;
    rest.forEach(({ g }) => { g.hidden = true; });
    first.g.hidden = false;
    const rowOf = new Map(rowsByGroup.flatMap(({ rows }) => rows).map((row) => [row.dataset.id, row]));
    rowOf.forEach((row) => { row.hidden = true; });
    ranked.forEach((o) => { const row = rowOf.get(o.id); row.hidden = false; first.ul.appendChild(row); });
  }
  const shown = grouped ? ORGS.length : rank({ cause, priority: sort, hood }).length;
  const empty = $('#all-empty');
  empty.hidden = shown > 0;
  empty.textContent = shown ? '' : 'No charity matches. Try another neighborhood.';
  $('#all-h').textContent = grouped ? `All ${ORGS.length} charities.` : `${shown} ${shown === 1 ? 'charity' : 'charities'}${cause ? ` in ${causeOf(cause).short.toLowerCase()}` : ''}.`;
  viewTitle = `${grouped ? `All ${ORGS.length} charities` : $('#all-h').textContent.replace(/\.$/, '')} · ${SITE.masthead}`;
  if (!grouped) announce(`${$('#all-h').textContent} ${sort === 'az' ? 'A to Z' : 'Ranked by ' + SORTS.find((s) => s.id === sort).label.toLowerCase()}.`);
}

/* --- panels -------------------------------------------------------------------------------- */

const detailEl = $('#detail');
const savedEl = $('#saved');
let opener = null;

function openPanel(el) {
  if (el.open) return;
  opener = document.activeElement;
  el.classList.remove('closing');
  el.showModal();
  el.scrollTop = 0;
  const h = $('h2', el);
  if (h) h.focus();
}
function closePanel(el, after) {
  if (!el.open) { after && after(); return; }
  const done = () => { el.classList.remove('closing'); el.close(); after && after(); };
  if (reduced()) return done();
  el.classList.add('closing');
  setTimeout(done, ms('--dur'));
}
for (const el of [detailEl, savedEl]) {
  el.addEventListener('cancel', (e) => { e.preventDefault(); requestClose(el); });
  el.addEventListener('click', (e) => {
    if (e.target === el) requestClose(el);                 // the backdrop
    if (e.target.closest('[data-close]')) requestClose(el);
  });
  el.addEventListener('close', () => {
    const back = opener && document.contains(opener) && !opener.closest('[hidden]') ? opener : $(`#${lastView} h1`);
    back?.focus({ preventScroll: true });
  });
}
/* Closing the details removes &org from the URL: Back if we pushed it, so
   Back after a close does not reopen the panel; a replace otherwise. */
function requestClose(el) {
  if (el === detailEl) {
    if (history.state && history.state.app && history.state.org) history.back();
    else { const cur = current(); delete cur.params.org; history.replaceState(null, '', href(cur)); render(); }
  } else if (el === savedEl) {
    const cur = current();
    if (cur.params.give) { delete cur.params.give; history.replaceState(null, '', href(cur)); }
    closePanel(savedEl);
  }
}

function syncDetail(id) {
  const o = id && byId.get(id);
  if (!o) { closePanel(detailEl); return; }
  if (detailEl.dataset.id !== id || !detailEl.open) {
    detailEl.dataset.id = id;
    detailEl.innerHTML = detail(o);
    syncSaveButtons();
    openPanel(detailEl);
  }
}
function openOrg(id) {
  const cur = current();
  cur.params.org = id;
  history.pushState({ app: true, org: id }, '', href(cur));
  render();
}

/* --- caution cards ------------------------------------------------------------------------------ */
/* Each caution line is a popovertarget button, so the card opens without
   script. Here it also opens on hover for a mouse, after a short intent
   delay, and stays open while the pointer travels into it (WCAG 1.4.13:
   hoverable, dismissable with Esc, persistent). A press pins it open; a
   second press, Esc or a click elsewhere closes it. Script opens every card
   itself so it can be placed before it paints. */

const tips = { open: null, trigger: null, pinned: false, focused: null, inTimer: 0, outTimer: 0 };
const px = (el, name) => parseFloat(getComputedStyle(el).getPropertyValue(name)) || 0;

function placeTip(tip, trigger) {
  const r = trigger.getBoundingClientRect();
  const root = document.documentElement;
  const vw = root.clientWidth, vh = root.clientHeight;
  const pad = px(root, '--gutter'), gap = px(root, '--tip-gap'), arrow = px(root, '--tip-arrow');
  const w = tip.offsetWidth, h = tip.offsetHeight;
  const left = Math.max(pad, Math.min(r.left, vw - pad - w));
  const below = r.bottom + gap, above = r.top - gap - h;
  const side = below + h > vh - pad && above >= pad ? 'above' : 'below';
  tip.style.left = `${left}px`;
  tip.style.top = `${side === 'above' ? above : Math.max(pad, Math.min(below, vh - pad - h))}px`;
  // Aim at the line's first words: its centre on a short line, a little in on a long one.
  const aim = r.left + Math.min(r.width / 2, arrow * 3) - left;
  tip.style.setProperty('--arrow-x', `${Math.max(arrow * 1.5, Math.min(aim, w - arrow * 1.5))}px`);
  tip.dataset.side = side;
}

function showTip(trigger, pinned) {
  const tip = document.getElementById(trigger.dataset.tip);
  if (!tip) return;
  clearTimeout(tips.inTimer); clearTimeout(tips.outTimer);
  if (openTip() === tip) { tips.pinned = tips.pinned || pinned; return; }
  if (openTip()) hideTip();
  tips.open = tip; tips.trigger = trigger; tips.pinned = pinned;
  try { tip.showPopover({ source: trigger }); } catch { tip.showPopover(); }
  placeTip(tip, trigger);
  trigger.classList.add('is-open');
}
function hideTip() {
  clearTimeout(tips.inTimer); clearTimeout(tips.outTimer);
  if (tips.open && tips.open.matches(':popover-open')) tips.open.hidePopover();
}
// Every way a card closes (Esc, a click elsewhere, another card, a panel
// opening) lands here, so the state is reset in one place. The trigger is
// found by id: the state may already have moved on to another card.
document.addEventListener('toggle', (e) => {
  const tip = e.target;
  if (!tip.classList?.contains('tip')) return;
  const trigger = document.querySelector(`[data-tip="${tip.id}"]`);
  trigger?.classList.toggle('is-open', e.newState === 'open');
  if (e.newState !== 'closed') return;
  if (tips.open === tip) { tips.open = tips.trigger = null; tips.pinned = false; }
  // Focus was in the card (its Details button): hand it back to the line.
  if (tips.focused === tip) {
    tips.focused = null;
    if (document.activeElement === document.body || tip.contains(document.activeElement)) trigger?.focus({ preventScroll: true });
  }
}, true);
document.addEventListener('focusin', (e) => { tips.focused = e.target.closest?.('.tip') || null; });

document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse') return;
  const trigger = e.target.closest('[data-tip]');
  const inOpen = openTip() && (tips.open.contains(e.target) || trigger === tips.trigger);
  if (inOpen) { clearTimeout(tips.outTimer); return; }
  clearTimeout(tips.inTimer);
  if (trigger) tips.inTimer = setTimeout(() => showTip(trigger, false), ms('--tip-in'));
  if (tips.open && !tips.pinned) { clearTimeout(tips.outTimer); tips.outTimer = setTimeout(hideTip, ms('--tip-out')); }
});
document.addEventListener('pointerout', (e) => {
  // Leaving the window: no pointerover follows, so start the grace here.
  if (e.pointerType === 'mouse' && !e.relatedTarget && tips.open && !tips.pinned) {
    clearTimeout(tips.inTimer); tips.outTimer = setTimeout(hideTip, ms('--tip-out'));
  }
});
// A re-render can remove an open card without a toggle event: forget it then.
const openTip = () => (tips.open && tips.open.isConnected && tips.open.matches(':popover-open') ? tips.open : (tips.open = tips.trigger = null));
addEventListener('scroll', () => { if (openTip()) placeTip(tips.open, tips.trigger); }, { passive: true, capture: true });
addEventListener('resize', () => { if (openTip()) placeTip(tips.open, tips.trigger); });

/* --- saved ------------------------------------------------------------------------------------ */

let sharedIds = null;
function renderSaved() {
  const mine = saved.list();
  const shared = sharedIds && sharedIds.known.length ? sharedIds : null;
  const ids = shared ? shared.known : mine;
  const newOnes = shared ? shared.known.filter((id) => !saved.has(id)) : [];
  savedEl.innerHTML = `
    <div class="panel-head"><span class="tag">${icon('save', 'ico ico-xs')}${shared ? 'Shared with you' : 'Your list'}</span>
      <button class="panel-close" type="button" data-close>${icon('close', 'ico ico-sm')}<span class="sr-only">Close</span></button></div>
    <div class="saved-body">
      <h2 class="saved-h" id="saved-h" tabindex="-1">${shared ? 'A list someone shared.' : 'Your giving list.'}</h2>
      <p class="saved-sub">${shared
        ? `${plural(ids.length, 'charity', 'charities')}${shared.missing ? `. ${plural(shared.missing, 'link')} pointed to a charity no longer listed` : ''}.`
        : 'Saved in this browser only. Share the list to open it on another device or send it to someone.'}</p>
      ${shared && newOnes.length ? `<div class="shared-note"><p>${plural(newOnes.length, 'of these is', 'of these are')} not on your list yet.</p><button class="btn btn-dark btn-sm" type="button" data-add-shared>Add ${newOnes.length === 1 ? 'it' : 'them'} to my list</button></div>` : ''}
      ${ids.length ? `<ul class="saved-list">${ids.map((id) => byId.get(id)).map(savedItem).join('')}</ul>` : `<div class="saved-empty"><p>Nothing saved yet. Press Save on any charity and it collects here with its donation link, ready to share.</p><a class="btn btn-dark" href="#/" data-close>Find a charity</a></div>`}
      ${ids.length && !shared ? `<div class="saved-share"><button class="btn btn-primary btn-sm" type="button" data-share>Copy share link</button><button class="btn btn-sm" type="button" data-copy>Copy as text</button><button class="btn btn-sm" type="button" data-clear>Clear list</button></div>
      <div class="saved-remind"><p>Remind me to give again</p><button class="btn btn-sm" type="button" data-remind="month">Every month</button><button class="btn btn-sm" type="button" data-remind="year">Every December</button></div>` : ''}
    </div>`;
  if (shared) $$('[data-remove]', savedEl).forEach((b) => b.remove());
}
function openSaved() { sharedIds = null; renderSaved(); openPanel(savedEl); }
function syncShared(give) {
  if (!give) { if (sharedIds) { sharedIds = null; if (savedEl.open) renderSaved(); } return; }
  sharedIds = saved.parseShared(give);
  renderSaved();
  openPanel(savedEl);
}

async function copy(text, okMsg) {
  try { await navigator.clipboard.writeText(text); announce(okMsg); toast(okMsg); }
  catch { window.prompt('Copy this:', text); }
}
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('aria-hidden', 'true'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
}

savedEl.addEventListener('click', (e) => {
  const b = e.target.closest('button, a');
  if (!b) return;
  if (b.dataset.remove) { const o = byId.get(b.dataset.remove); saved.remove(b.dataset.remove); renderSaved(); announce(`Removed ${o.name}.`); $('h2', savedEl).focus(); }
  if ('share' in b.dataset) copy(saved.shareUrl(), 'Share link copied.');
  if ('copy' in b.dataset) copy(saved.asText(), 'List copied as text.');
  if (b.dataset.remind) {
    const href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(saved.reminder(b.dataset.remind));
    const a = Object.assign(document.createElement('a'), { href, download: 'givechi-reminder.ics' });
    document.body.appendChild(a); a.click(); a.remove();
    const msg = 'Reminder downloaded. Open it to add it to your calendar.';
    announce(msg); toast(msg);
  }
  if ('clear' in b.dataset) { saved.clear(); renderSaved(); announce('List cleared.'); $('h2', savedEl).focus(); }
  if ('addShared' in b.dataset) { saved.addAll(sharedIds.known); announce('Added to your list.'); requestClose(savedEl); }
});

function syncSaveButtons() {
  $$('[data-save]').forEach((b) => {
    const on = saved.has(b.dataset.save);
    b.setAttribute('aria-pressed', String(on));
    const t = $('.save-t', b); if (t) t.textContent = on ? 'Saved' : 'Save';
  });
  const n = saved.list().length;
  $('#saved-n').textContent = n;
  $('#saved-open').classList.toggle('has-items', n > 0);
  $('#saved-open').setAttribute('aria-label', `Saved list, ${plural(n, 'charity', 'charities')}`);
}
saved.subscribe(() => syncSaveButtons());
$('#saved-open').addEventListener('click', openSaved);

/* --- one listener for every link and button that routes ----------------------------------------- */

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const t = e.target;

  // A caution line: a press pins its card open, or closes a pinned one.
  const tipBtn = t.closest('[data-tip]');
  if (tipBtn) {
    e.preventDefault();                                     // script opens it, placed
    const tip = document.getElementById(tipBtn.dataset.tip);
    if (openTip() === tip && tips.pinned) hideTip(); else showTip(tipBtn, true);
    return;
  }

  const s = t.closest('[data-save]');
  if (s) {
    const on = saved.toggle(s.dataset.save);
    const o = byId.get(s.dataset.save);
    announce(on ? `Saved ${o.name}. ${plural(saved.list().length, 'charity', 'charities')} on your list.` : `Removed ${o.name} from your list.`);
    s.classList.toggle('pop', on);
    const pill = $('#saved-open'); pill.classList.remove('bump'); void pill.offsetWidth; if (on) pill.classList.add('bump');
    return;
  }
  const org = t.closest('[data-org]');
  if (org) {
    e.preventDefault();
    // From a caution card: the line that opened it takes focus back when the panel closes.
    if (tips.open && tips.open.contains(org)) { tips.trigger.focus({ preventScroll: true }); hideTip(); }
    const go = () => { openOrg(org.dataset.org); if (org.dataset.at) $(`#${org.dataset.at}`, detailEl)?.scrollIntoView({ block: 'start' }); };
    if (savedEl.open) closePanel(savedEl, go); else go();
    return;
  }

  const tile = t.closest('[data-cause]');
  if (tile) { e.preventDefault(); go({ view: 'fit', cause: tile.dataset.cause, params: {} }, { transition: true }); return; }

  if (t.closest('[data-home]')) { e.preventDefault(); go({ view: 'home', params: {} }, { transition: true }); return; }

  const route = t.closest('a[data-route]');
  if (route) { e.preventDefault(); const v = route.dataset.route.slice(1) || 'home'; go({ view: v, params: {} }); return; }

  // A hash link inside a panel goes to its route: close the panel first.
  const a = t.closest('a[href^="#/"]');
  if (a && a.closest('dialog')) {
    e.preventDefault();
    const target = a.getAttribute('href');
    closePanel(a.closest('dialog'), () => { history.pushState({ app: true }, '', target); render({ moved: true }); });
  }
});

/* --- start ----------------------------------------------------------------------------------------- */

document.documentElement.classList.add('app-ready');
render({ moved: false });
