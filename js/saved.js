/* SAVED: the giving list. Kept in this browser (localStorage) and shareable
   as a link (#/?give=a,b). Storage can be missing or throw (private mode,
   blocked site data), so every read and write is guarded and the list still
   works for the session in memory. */

import { byId } from './core.js';

const KEY = 'givechi:saved';
let ids = load();
const subs = new Set();

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw.filter((id) => byId.has(id)) : [];
  } catch { return []; }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* memory only */ }
  subs.forEach((fn) => fn(ids));
}

export const list = () => [...ids];
export const has = (id) => ids.includes(id);
export function toggle(id) {
  if (!byId.has(id)) return false;
  ids = has(id) ? ids.filter((x) => x !== id) : [...ids, id];
  persist();
  return has(id);
}
export function remove(id) { ids = ids.filter((x) => x !== id); persist(); }
export function clear() { ids = []; persist(); }
export function addAll(more) { ids = [...new Set([...ids, ...more.filter((id) => byId.has(id))])]; persist(); }
export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }

/* Another tab changed the list: follow it. */
addEventListener('storage', (e) => { if (e.key === KEY) { ids = load(); subs.forEach((fn) => fn(ids)); } });

/* A share link carries ids; unknown ones (an organization that has left the
   directory) are dropped and counted so the reader can be told. */
export function parseShared(value) {
  const raw = [...new Set(String(value || '').split(',').map((s) => s.trim()).filter(Boolean))];
  const known = raw.filter((id) => byId.has(id));
  return { known, missing: raw.length - known.length };
}
export function shareUrl(list = ids) {
  const base = location.href.split('#')[0];
  return `${base}#/?give=${list.map(encodeURIComponent).join(',')}`;
}
export function asText(list = ids) {
  return list.map((id) => byId.get(id)).map((o) => `${o.name}\nDonate: ${o.donateUrl}`).join('\n\n');
}

/* A calendar reminder to give again, built here and downloaded: nothing
   leaves the browser. Monthly lands on the 1st; yearly on 1 December, ahead
   of year-end giving. Times are floating, so 9 a.m. is the reader's own. */
const icsText = (s) => String(s).replace(/[\;,]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
const fold = (line) => line.match(/.{1,73}/g).join('\r\n ');
const stamp = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
export function reminder(every, list = ids, now = new Date()) {
  const first = every === 'month'
    ? new Date(now.getFullYear(), now.getMonth() + 1, 1)
    : new Date(now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(), 11, 1);
  const utc = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const body = `Your giving list:\n\n${asText(list)}\n\nOpen the list: ${shareUrl(list)}`;
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GiveChi//Giving reminder//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:givechi-${every}-${utc}@givechi.org`, `DTSTAMP:${utc}`,
    `DTSTART:${stamp(first)}T090000`, `DTEND:${stamp(first)}T091500`,
    `RRULE:FREQ=${every === 'month' ? 'MONTHLY' : 'YEARLY'}`,
    `SUMMARY:${icsText('Give to your GiveChi list')}`,
    `DESCRIPTION:${icsText(body)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsText('Give to your GiveChi list')}`, 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'
  ].map(fold).join('\r\n') + '\r\n';
}
