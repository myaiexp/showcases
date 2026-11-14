// Sample data for Chart.js examples: seeded random, labels, palette, series
/** Deterministic random numbers, so a card shows the same chart on every visit. */
export function seeded(seed = 1): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Named colours matching the site's palette (mase.fi base.css). */
export const C = {
  amber: '#e8a308',
  blue: '#58a6ff',
  green: '#22c55e',
  red: '#ef4444',
  purple: '#bc8cff',
  cyan: '#06b6d4',
  orange: '#f97316',
  pink: '#f472b6',
  grey: '#a1a1aa',
} as const;

export const PALETTE: readonly string[] = [C.blue, C.amber, C.green, C.purple, C.red, C.cyan, C.orange, C.pink];

/** A `#rrggbb` colour with an alpha, as an rgba() string Chart.js accepts. */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** `n` whole numbers between `min` and `max`. */
export function numbers(n: number, min: number, max: number, rand = Math.random): number[] {
  return Array.from({ length: n }, () => Math.round(min + rand() * (max - min)));
}

/** A random walk of `n` steps starting at `start`, never below zero. */
export function walk(n: number, start: number, step: number, rand = Math.random): number[] {
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    v = Math.max(0, v + (rand() - 0.5) * 2 * step);
    out.push(Math.round(v * 10) / 10);
  }
  return out;
}

/** UTC midnight timestamps for `n` consecutive days from `start` (ISO date). */
export function days(n: number, start = '2026-01-01'): number[] {
  const t0 = Date.parse(`${start}T00:00:00Z`);
  return Array.from({ length: n }, (_, i) => t0 + i * 86_400_000);
}
