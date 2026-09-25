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
