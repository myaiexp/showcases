// Seeded random numbers, so generated sample data is the same on every visit

/** A mulberry32 generator: returns numbers in [0, 1), the same sequence for the same seed. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Normally distributed numbers (Box–Muller) from a seeded generator. */
export function normal(random: () => number, mean = 0, sd = 1): () => number {
  return () => {
    const u = 1 - random();
    const v = random();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

/** A random walk of `n` steps from `start`, each step normal with spread `sd`. */
export function walk(random: () => number, n: number, start = 100, sd = 2): number[] {
  const step = normal(random, 0, sd);
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    v += step();
    out.push(Math.round(v * 100) / 100);
  }
  return out;
}

/** `n` consecutive UTC days from `start` (YYYY-MM-DD). */
export function days(start: string, n: number): Date[] {
  const t0 = Date.parse(`${start}T00:00:00Z`);
  return Array.from({ length: n }, (_, i) => new Date(t0 + i * 86_400_000));
}
