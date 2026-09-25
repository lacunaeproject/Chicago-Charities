/* One voice. Every change a screen reader should hear goes through here, into
   one polite live region (WCAG 4.1.3), so one action is announced once.
   The region is cleared and refilled on the next frame, so saying the same
   thing twice ("9 of 39 organizations" after two different nine-row
   filters) is still said twice. */

let region = null;
let pending = 0;

function ensure() {
  if (region && document.contains(region)) return region;
  region = document.getElementById('announcer');
  if (!region) {
    region = document.createElement('div');
    region.id = 'announcer';
    region.className = 'sr-only';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.appendChild(region);
  }
  return region;
}

export function announce(message) {
  // A later change speaks over a message still waiting for focus to settle.
  if (settling) settling();
  const el = ensure();
  el.textContent = '';
  cancelAnimationFrame(pending);
  pending = requestAnimationFrame(() => { el.textContent = message; });
}

/* For a change the reader did not make with the control they are on (a
   cross-reference that cleared their filter). The page moves focus ~300ms
   later and screen readers cancel speech on a focus change, so this waits
   until focus has been still for `quiet` ms, never longer than `max`. */
let settling = null;
export function announceWhenSettled(message, { quiet = 400, max = 2500 } = {}) {
  if (settling) settling();              // a newer message replaces a waiting one
  const start = performance.now();
  let t = 0;
  const stop = () => { clearTimeout(t); document.removeEventListener('focusin', bump, true); settling = null; };
  const fire = () => { stop(); announce(message); };
  function bump() {
    clearTimeout(t);
    t = setTimeout(fire, performance.now() - start > max ? 0 : quiet);
  }
  settling = stop;
  document.addEventListener('focusin', bump, true);
  bump();
}
