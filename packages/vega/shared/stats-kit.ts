// Statistics helpers: seeded sampling, a label mark, histogram counts
import * as vega from 'vega';
import type { Mark } from 'vega';

/**
 * Runs fn with vega.random replaced by a seeded generator, then puts Math.random back.
 * The generator is page-wide state, so it is only swapped for the synchronous call.
 */
export function seeded<T>(seed: number, fn: () => T): T {
  // setRandom and randomLCG exist at runtime but are missing from vega's type definitions.
  const api = vega as unknown as { setRandom(f: () => number): void; randomLCG(seed: number): () => number };
  api.setRandom(api.randomLCG(seed));
  try {
    return fn();
  } finally {
    api.setRandom(Math.random);
  }
}

/** A line of monospace text bound to a signal, at the top left of the view. */
export function labelMark(signal: string, y = -6, fill = '#ddd'): Mark {
  return {
    type: 'text',
    encode: { update: { x: { value: 0 }, y: { value: y }, text: { signal }, fill: { value: fill }, font: { value: 'monospace' }, fontSize: { value: 11 } } },
  };
}

/** n evenly spaced numbers from lo to hi inclusive. */
export function linspace(lo: number, hi: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1));
}

/** Counts of values in the bins vega.bin produced: rows of {x0, x1, d} with d a density. */
export function histogram(values: number[], b: { start: number; stop: number; step: number }): { x0: number; x1: number; d: number; n: number }[] {
  const count = Math.max(1, Math.round((b.stop - b.start) / b.step));
  const counts = new Array<number>(count).fill(0);
  for (const v of values) {
    const k = Math.floor((v - b.start) / b.step);
    if (k >= 0 && k < count) counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts.map((n, k) => ({ x0: b.start + k * b.step, x1: b.start + (k + 1) * b.step, n, d: n / (values.length * b.step) }));
}
