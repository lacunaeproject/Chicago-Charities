// Shared data + matcher for the three homepage mockups. Every figure comes
// from data/orgs.js via data.json; nothing here is invented.
export async function load() {
  const d = await (await fetch('data.json')).json();
  return d;
}

export const PRIORITIES = [
  { id: 'proven',   label: 'Proven results',        hint: 'Outside evidence the program works' },
  { id: 'dollar',   label: 'Most of my dollar',     hint: 'Highest share spent on programs' },
  { id: 'steady',   label: 'Steady finances',       hint: 'No recent deficits, strong rating' },
  { id: 'local',    label: 'Small and local',       hint: 'Neighborhood groups where a gift shows' },
  { id: 'reach',    label: 'Biggest reach',         hint: 'Large operations serving the most people' },
];

const RANK = { 'randomized-trial': 3, 'independent-study': 2, 'self-reported': 1 };
const WIDE = new Set(['Citywide', 'Countywide', 'Regional', 'Statewide', 'Multi-region', 'National']);
const LOCAL = new Set(['Neighborhood', 'Multi-neighborhood']);

export function money(n) {
  if (n == null || n < 0) return null;
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
  if (n >= 1e8) return '$' + Math.round(n / 1e6) + 'M';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  return '$' + Math.round(n / 1e3) + 'K';
}

export const CAUTION = new Set(['deficit', 'funding-risk', 'labor']);

export function match(orgs, { cause = null, priority = 'proven', hood = null } = {}) {
  let pool = orgs.filter((o) => !cause || o.causes.includes(cause));
  if (hood) pool = pool.filter((o) => o.hoods.includes(hood) || WIDE.has(o.scale));
  const by = {
    proven: (a, b) => RANK[b.ev] - RANK[a.ev] || (b.ratio ?? 0) - (a.ratio ?? 0),
    dollar: (a, b) => (b.ratio ?? -1) - (a.ratio ?? -1),
    steady: (a, b) => (a.flags.includes('deficit') - b.flags.includes('deficit')) || (b.cn ?? 0) - (a.cn ?? 0) || (b.ratio ?? 0) - (a.ratio ?? 0),
    local:  (a, b) => (LOCAL.has(b.scale) - LOCAL.has(a.scale)) || (a.exp ?? 9e12) - (b.exp ?? 9e12),
    reach:  (a, b) => (b.exp ?? -1) - (a.exp ?? -1),
  }[priority];
  return [...pool].sort(by);
}

export function reason(o, priority, tiers) {
  switch (priority) {
    case 'proven': return tiers[o.ev].label + (o.ev === 'self-reported' ? '' : ': ' + tiers[o.ev].brief);
    case 'dollar': return o.ratio == null ? 'No program ratio published' : o.ratio.toFixed(1) + '% of spending reaches programs';
    case 'steady': return (o.flags.includes('deficit') ? 'Has a recent deficit' : 'No recent deficit') + (o.cn ? ' · rated ' + o.cn + '/100' : '');
    case 'local':  return o.hoods.length ? o.hoods.slice(0, 3).join(', ') : o.scale;
    case 'reach':  return (money(o.exp) || 'No figure') + ' spent a year';
  }
}

export const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0 L14.4 7.843 L22.392 6 L16.8 12 L22.392 18 L14.4 16.157 L12 24 L9.6 16.157 L1.608 18 L7.2 12 L1.608 6 L9.6 7.843 Z"/></svg>';
export const stars = (n = 4) => STAR.repeat(n);
