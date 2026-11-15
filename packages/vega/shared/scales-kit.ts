// Small helpers for the Scales and Schemes examples: a seeded rng and a card-only signal cycler
import type { View } from 'vega';
import type { Stage } from './stage.ts';

/** mulberry32: a tiny seeded generator, so every example draws the same data each time. */
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

/**
 * In cards only: every `ms`, set the named signals to the next entry of `steps`
 * (an object per step, e.g. `{lo: 0, hi: 50}`), so the property under study visibly changes.
 */
export function cycle(stage: Stage, view: View, steps: readonly Record<string, unknown>[], ms = 1500): void {
  if (!stage.preview) return;
  stage.every(ms, (i) => {
    const step = steps[i % steps.length];
    for (const [name, value] of Object.entries(step)) view.signal(name, value);
    return view.runAsync().then(() => undefined);
  });
}
