// Sample data for the series.line examples: a seeded random walk and time labels
/** Deterministic pseudo-random numbers in [0, 1), so a chart looks the same on every load. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random walk of `n` values starting at `start`, each step within ±`step`. */
export function walk(n: number, seed: number, start = 100, step = 5): number[] {
  const rand = seeded(seed);
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    v += (rand() - 0.5) * 2 * step;
    out.push(Math.round(v * 10) / 10);
  }
  return out;
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Labels '00:00' … for `n` evenly spaced points across a day. */
export function hours(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const m = Math.round((i * 1440) / n);
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  });
}
