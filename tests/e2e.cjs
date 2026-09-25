/* End-to-end checks for the rebuilt site. Serves nothing itself: point it
   at a running server.

     node tests/e2e.cjs [base-url]      default http://127.0.0.1:8901/

   Covers: the page without script; axe on every view and panel at desk and
   phone width; no sideways scroll at 13 widths and at 200% text; routing,
   Back, reload and deep links; focus on every view change and panel close;
   the saved list, its persistence and share links; reduced motion. */

const { chromium } = require('../node_modules/playwright');
const fs = require('fs');
const AXE = fs.readFileSync(require.resolve('../node_modules/axe-core/axe.min.js'), 'utf8');
const BASE = process.argv[2] || 'http://127.0.0.1:8901/';
// CHROMIUM points at a system browser; unset, Playwright uses its own.
const EXE = process.env.CHROMIUM || undefined;

let pass = 0, fail = 0;
const ok = (name, cond, info = '') => { if (cond) pass++; else fail++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond || !info ? '' : '  — ' + info}`); };
const settle = (p, t = 700) => p.waitForTimeout(t);

async function page(b, opts = {}) {
  const ctx = await b.newContext({ viewport: { width: opts.w || 1440, height: opts.h || 900 }, javaScriptEnabled: opts.js !== false, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  p.errors = [];
  p.on('pageerror', (e) => p.errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon/.test(m.text())) p.errors.push(m.text()); });
  return { ctx, p };
}
async function load(p, hash = '') { await p.goto(BASE + hash, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await settle(p, 400); }
async function axe(p) {
  await p.addScriptTag({ content: AXE });
  const r = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0].target}`));
  return r;
}
const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
const active = (p) => p.evaluate(() => { const a = document.activeElement; return a.id || a.dataset.org || a.textContent.trim().slice(0, 40); });

(async () => {
  const b = await chromium.launch({ executablePath: EXE });

  /* --- 1. without script: everything is there and nothing is broken --- */
  {
    const { ctx, p } = await page(b, { js: false });
    await load(p);
    const r = await p.evaluate(() => ({
      tiles: document.querySelectorAll('.tile').length,
      donate: [...document.querySelectorAll('.row-donate')].filter((a) => a.offsetParent).length,
      how: !!document.querySelector('#how h1') && document.querySelector('#how').offsetParent !== null,
      hiddenJs: [...document.querySelectorAll('.js-only')].every((e) => !e.offsetParent),
      tileTarget: document.querySelector('.tile[data-cause="food"]').getAttribute('href'),
    }));
    ok('no-JS: 9 cause tiles', r.tiles === 9, JSON.stringify(r));
    ok('no-JS: all 39 Donate links visible', r.donate === 39, r.donate);
    ok('no-JS: How we check visible', r.how);
    ok('no-JS: script-only controls hidden', r.hiddenJs);
    ok('no-JS: a tile jumps to its cause in the list', r.tileTarget === '#all-food' && await p.$('#all-food') !== null);
    await p.click('.row[data-id="openlands"] .caution'); await settle(p, 200);
    ok('no-JS: a caution line opens its card natively', await p.evaluate(() => document.querySelector('#tip-r-openlands').matches(':popover-open')));
    await ctx.close();
  }

  /* --- 2. axe, desk and phone, every view and panel --- */
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, p } = await page(b, { w, h });
    for (const [name, hash] of [['home', ''], ['results', '#/fit/housing?p=steady'], ['all', '#/all'], ['all sorted', '#/all?sort=dollar&cause=legal'], ['how', '#/how'], ['details', '#/fit/youth?org=youth-guidance'], ['shared list', '#/?give=care-for-real,deborahs-place']]) {
      await load(p, hash); await settle(p);
      const v = await axe(p);
      ok(`axe ${w}: ${name}`, v.length === 0, v.join(' | '));
    }
    ok(`no console errors ${w}`, p.errors.length === 0, p.errors.join(' | '));
    await ctx.close();
  }

  /* --- 3. no sideways scroll: 13 widths, then 200% text at 320 --- */
  {
    const hashes = ['', '#/fit/women?p=local', '#/all?sort=reach', '#/how', '#/fit/legal?org=national-immigrant-justice-center', '#/?give=chicago-cred,openlands'];
    const bad = [];
    for (const w of [320, 360, 390, 414, 480, 600, 720, 768, 900, 1024, 1280, 1440, 1920]) {
      const { ctx, p } = await page(b, { w, h: 900 });
      for (const hash of hashes) { await load(p, hash); const o = await overflow(p); if (o > 0) bad.push(`${w}${hash}:${o}`); }
      await ctx.close();
    }
    ok('no overflow at 13 widths', bad.length === 0, bad.join(' '));
    const bad2 = [];
    const { ctx, p } = await page(b, { w: 320, h: 700 });
    for (const hash of hashes) {
      await load(p, hash);
      await p.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
      await settle(p, 200);
      const o = await overflow(p); if (o > 0) bad2.push(`${hash || 'home'}:${o}`);
      const clipped = await p.evaluate(() => [...document.querySelectorAll('h1, .card-name, .panel-name, .tile-t, .btn')].filter((e) => e.offsetParent && e.scrollWidth > e.clientWidth + 1).map((e) => e.className || e.tagName).slice(0, 3));
      if (clipped.length) bad2.push(`${hash || 'home'} clipped ${clipped}`);
    }
    ok('200% text at 320: no overflow or clipping', bad2.length === 0, bad2.join(' '));
    await ctx.close();
  }

  /* --- 4. routing, focus, Back, reload, deep links --- */
  {
    const { ctx, p } = await page(b);
    await load(p);
    const len0 = await p.evaluate(() => history.length);
    await p.click('.tile[data-cause="housing"]'); await settle(p, 900);
    ok('tile → results route', (await p.evaluate(() => location.hash)) === '#/fit/housing');
    ok('results: focus on the headline', (await active(p)) === 'fit-h');
    ok('results: three cards', (await p.$$eval('.card', (c) => c.length)) === 3);
    await p.focus('#f-p'); await p.selectOption('#f-p', 'dollar'); await settle(p, 900);
    ok('pill: URL updated in place', (await p.evaluate(() => location.hash)) === '#/fit/housing?p=dollar');
    ok('pill: focus stays on the pill', (await active(p)) === 'f-p');
    ok('pill: no new history entry', (await p.evaluate(() => history.length)) === len0 + 1);
    const first = await p.$eval('.card.is-first .card-name', (e) => e.textContent.trim());
    ok('pill: re-ranked by program share (housing includes TRP, 97.9%)', first === 'The Resurrection Project', first);
    const firstId = await p.$eval('.card.is-first .card-go [data-org]', (e) => e.dataset.org);

    await p.click('.card.is-first .card-go [data-org]'); await settle(p);
    ok('details: open, URL carries org', await p.evaluate(() => document.querySelector('#detail').open && location.hash.includes('org=the-resurrection-project')));
    ok('details: focus on its name', (await active(p)) === 'detail-h');
    ok('details: title names the charity', (await p.title()).startsWith('The Resurrection Project'));
    await p.keyboard.press('Escape'); await settle(p);
    ok('details: Escape closes and clears org', await p.evaluate(() => !document.querySelector('#detail').open && !location.hash.includes('org=')));
    ok('details: focus back on Details', (await active(p)) === firstId);
    await p.goBack(); await settle(p);
    ok('Back after close goes home, not into the panel', await p.evaluate(() => location.hash === '' || location.hash === '#/') && await p.evaluate(() => !document.querySelector('#detail').open), await p.evaluate(() => location.hash));
    ok('home: focus on the question', (await active(p)) === 'home-h');
    await p.goForward(); await settle(p);
    ok('Forward returns to results', (await p.evaluate(() => location.hash)) === '#/fit/housing?p=dollar');

    await load(p, '#/fit/legal?p=proven&org=invisible-institute'); await settle(p);
    ok('deep link: results + details open', await p.evaluate(() => document.querySelector('#detail').open && document.querySelector('#fit-h').textContent.includes('legal aid')));
    await p.click('#detail [data-close]'); await settle(p);
    ok('deep link: close leaves the results', await p.evaluate(() => location.hash === '#/fit/legal?p=proven' && !document.querySelector('#fit').hidden));
    await p.reload({ waitUntil: 'networkidle' }); await settle(p);
    ok('reload keeps the view', await p.evaluate(() => !document.querySelector('#fit').hidden && location.hash === '#/fit/legal?p=proven'));

    await load(p, '#all-food'); await settle(p);
    ok('old anchor #all-food → food results', (await p.evaluate(() => location.hash)) === '#/fit/food');
    await load(p, '#how-we-vetted'); await settle(p);
    ok('old anchor #how-we-vetted → How we check', await p.evaluate(() => !document.querySelector('#how').hidden));
    await load(p, '#/fit/food'); await p.click('.foot a[href="#how-made"]'); await settle(p);
    ok('footer: AI disclosure links to How it’s made', await p.evaluate(() => !document.querySelector('#how').hidden && /Generated with AI and overseen by Cody Heart/.test(document.querySelector('.foot').textContent) && Math.abs(document.querySelector('#how-made').getBoundingClientRect().top) < 120));

    await load(p, '#/all?cause=housing&sort=reach'); await settle(p);
    const rows = await p.$$eval('.row:not([hidden])', (r) => r.map((x) => x.dataset.id));
    ok('all: filtered to housing, ranked by reach', rows.length === 10 && rows[0] === 'all-chicago', rows.slice(0, 3).join());
    await p.selectOption('#a-cause', 'any'); await p.selectOption('#a-sort', 'az'); await settle(p);
    ok('all: back to 39 grouped', await p.evaluate(() => document.querySelectorAll('.row:not([hidden])').length === 39 && !document.querySelector('#all-list').classList.contains('all-flat')));
    await p.click('.row[data-id="openlands"] .row-name a'); await settle(p);
    ok('all: a row opens its details', await p.evaluate(() => document.querySelector('#detail').open && document.querySelector('#detail-h').textContent === 'Openlands'));
    ok('unconfirmed form is flagged in details', await p.evaluate(() => /not confirmed/.test(document.querySelector('.panel-dest').textContent)));
    ok(`no console errors in flows`, p.errors.length === 0, p.errors.join(' | '));
    await ctx.close();
  }

  /* --- 5. keyboard: from the top to a result without a mouse --- */
  {
    const { ctx, p } = await page(b);
    await load(p);
    let reached = false;
    for (let i = 0; i < 12 && !reached; i++) { await p.keyboard.press('Tab'); reached = await p.evaluate(() => document.activeElement.matches('.tile')); }
    ok('keyboard: a tile is reachable', reached);
    await p.keyboard.press('Enter'); await settle(p, 900);
    ok('keyboard: Enter on a tile opens results', await p.evaluate(() => location.hash.startsWith('#/fit/')));
    await ctx.close();
  }

  /* --- 6. saved list: toggle, persist, share --- */
  {
    const { ctx, p } = await page(b);
    await load(p, '#/fit/food');
    await p.click('.card.is-first [data-save]'); await settle(p, 300);
    const id = await p.$eval('.card.is-first [data-save]', (e) => e.dataset.save);
    ok('save: pressed state and count', await p.evaluate(() => document.querySelector('.card.is-first [data-save]').getAttribute('aria-pressed') === 'true' && document.querySelector('#saved-n').textContent === '1'));
    await p.reload({ waitUntil: 'networkidle' }); await settle(p);
    ok('save: survives reload', await p.evaluate((id) => document.querySelector(`[data-save="${id}"]`).getAttribute('aria-pressed') === 'true', id));
    await p.click('#saved-open'); await settle(p);
    ok('saved panel: lists it, focus on its title', (await p.$$eval('#saved .saved-item', (x) => x.length)) === 1 && (await active(p)) === 'saved-h');
    await p.keyboard.press('Escape'); await settle(p);
    ok('saved panel: Escape returns focus to the button', (await active(p)) === 'saved-open');
    await load(p, '#/?give=deborahs-place,nope-gone,' + id);
    await settle(p);
    const sh = await p.evaluate(() => ({ open: document.querySelector('#saved').open, items: document.querySelectorAll('#saved .saved-item').length, text: document.querySelector('#saved .saved-sub').textContent, add: !!document.querySelector('[data-add-shared]') }));
    ok('share link: opens the shared list, counts the missing one', sh.open && sh.items === 2 && /1 link pointed/.test(sh.text) && sh.add, JSON.stringify(sh));
    await p.click('[data-add-shared]'); await settle(p);
    ok('share link: Add merges into my list and clears the link', await p.evaluate(() => document.querySelector('#saved-n').textContent === '2' && !location.hash.includes('give=')));
    await ctx.close();
  }

  /* --- 8. caution cards: hover, press, keys, placement --- */
  {
    const { ctx, p } = await page(b);
    const isOpen = (id) => p.evaluate((id) => !!document.getElementById(id)?.matches(':popover-open'), id);
    await load(p, '#/fit/youth');
    const trig = '.card [data-tip="tip-c-youth-guidance"]';
    ok('caution line names its kind', (await p.$eval(`${trig} .caution-t`, (e) => e.textContent)) === 'Cautions: finances, funding risk');
    await p.hover(trig); await settle(p, 450);
    ok('hover opens the card with the full note', await isOpen('tip-c-youth-guidance') && /\$17\.7M cumulative/.test(await p.$eval('#tip-c-youth-guidance', (e) => e.textContent)));
    await p.hover('#tip-c-youth-guidance p'); await settle(p, 450);
    ok('hoverable: stays open with the pointer inside it', await isOpen('tip-c-youth-guidance'));
    await p.mouse.move(2, 2); await settle(p, 450);
    ok('leaving closes it', !(await isOpen('tip-c-youth-guidance')));
    await p.hover(trig); await p.mouse.move(2, 2); await settle(p, 450);
    ok('a pass-over under the intent delay opens nothing', !(await p.evaluate(() => !!document.querySelector('.tip:popover-open'))));
    const v = await (async () => { await p.hover(trig); await settle(p, 450); return axe(p); })();
    ok('axe with a card open', v.length === 0, v.join(' | '));
    await p.click(trig); await p.mouse.move(2, 2); await settle(p, 450);
    ok('a press pins it open', await isOpen('tip-c-youth-guidance'));
    await p.keyboard.press('Escape'); await settle(p, 100);
    ok('Escape closes it, focus on the line', !(await isOpen('tip-c-youth-guidance')) && (await p.evaluate(() => document.activeElement.dataset.tip)) === 'tip-c-youth-guidance');
    await p.keyboard.press('Enter'); await settle(p, 100);
    ok('Enter opens it', await isOpen('tip-c-youth-guidance'));
    await p.keyboard.press('Enter'); await settle(p, 100);
    ok('Enter again closes it', !(await isOpen('tip-c-youth-guidance')));

    await load(p, '#/all');
    await p.evaluate(() => document.querySelector('.row[data-id="urban-growers-collective"]').scrollIntoView({ block: 'end' }));
    await p.hover('[data-tip="tip-r-urban-growers-collective"]'); await settle(p, 450);
    const box = await p.$eval('#tip-r-urban-growers-collective', (e) => { const r = e.getBoundingClientRect(); return { side: e.dataset.side, top: r.top, bottom: r.bottom, left: r.left, right: r.right, vw: innerWidth, vh: innerHeight }; });
    ok('near the bottom it opens above, inside the screen', box.side === 'above' && box.top >= 0 && box.bottom <= box.vh && box.right <= box.vw, JSON.stringify(box));
    await p.click('#tip-r-urban-growers-collective .tip-more'); await settle(p);
    ok('its Details link opens the panel at Worth knowing', await p.evaluate(() => { const d = document.querySelector('#detail'), h = document.querySelector('#w-h').getBoundingClientRect(); return d.open && h.top > 0 && h.top < innerHeight / 2; }));
    await p.keyboard.press('Escape'); await settle(p);
    ok('closing the panel returns focus to the caution line', (await p.evaluate(() => document.activeElement.dataset.tip)) === 'tip-r-urban-growers-collective');
    ok('the row\'s line lost its open state', !(await p.evaluate(() => document.querySelector('[data-tip="tip-r-urban-growers-collective"]').classList.contains('is-open'))));
    ok('no console errors in caution flows', p.errors.length === 0, p.errors.join(' | '));

    // "to programs" explains itself: hover opens its card, a closed card blocks nothing.
    await load(p, '#/all');
    ok('a closed term card takes no space', await p.$eval('#term-r-openlands', (e) => getComputedStyle(e).display === 'none'));
    await p.hover('[data-tip="term-r-openlands"]'); await settle(p, 450);
    ok('hovering "to programs" explains it with the charity\'s own figure', await isOpen('term-r-openlands') && /Openlands spent, about 83 cents/.test(await p.$eval('#term-r-openlands', (e) => e.textContent)));
    await p.keyboard.press('Escape'); await settle(p);
    ok('Escape closes the term card', !(await isOpen('term-r-openlands')));
    await ctx.close();

    // 200% text at 320: a long card still fits and scrolls inside.
    const s2 = await page(b, { w: 320, h: 640 });
    await load(s2.p, '#/all');
    await s2.p.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
    await s2.p.click('[data-tip="tip-r-howard-brown-health"]'); await settle(s2.p, 400);
    const fit = await s2.p.$eval('#tip-r-howard-brown-health', (e) => { const r = e.getBoundingClientRect(), l = e.querySelector('.tip-list'); return { l: r.left, r: r.right, t: r.top, b: r.bottom, vw: document.documentElement.clientWidth, vh: innerHeight, scrolls: l.scrollHeight > l.clientHeight }; });
    ok('200% text at 320: the longest card fits the screen', fit.l >= 0 && fit.r <= fit.vw && fit.t >= 0 && fit.b <= fit.vh && fit.scrolls, JSON.stringify(fit));
    await s2.ctx.close();
  }

  /* --- 7. reduced motion: nothing waits on an animation --- */
  {
    const { ctx, p } = await page(b, { reduced: true });
    await load(p, '#/fit/health?org=erie-family-health-centers');
    await p.keyboard.press('Escape'); await p.waitForTimeout(60);
    ok('reduced motion: panel closes at once', await p.evaluate(() => !document.querySelector('#detail').open));
    await ctx.close();
  }

  await b.close();
  console.log(`\n${pass} passed, ${fail} failed.`);
  process.exit(fail ? 1 : 0);
})();
