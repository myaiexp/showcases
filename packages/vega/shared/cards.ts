// Card helpers: a seeded rng, normal draws, and timers that step signals in cards only
import type { View } from 'vega';
import type { Stage } from './stage.ts';

/** mulberry32: a tiny seeded generator, so every mount draws the same data. */
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

/** Standard normal draws (Box-Muller) from a uniform generator. */
export function normals(rand: () => number): () => number {
  return () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
}

/** Cards only: step one signal through `values` on a timer. The full view's controls stay in charge. */
export function cycle(stage: Stage, view: View, name: string, values: readonly unknown[], ms = 1500): void {
  if (!stage.preview) return;
  stage.every(ms, (i) => {
    view.signal(name, values[i % values.length]);
    return view.runAsync().then(() => undefined);
  });
}

/**
 * Cards only: every `ms`, set several signals at once to the next entry of `steps`
 * (an object per step, e.g. `{lo: 0, hi: 50}`).
 */
export function cycleSteps(stage: Stage, view: View, steps: readonly Record<string, unknown>[], ms = 1500): void {
  if (!stage.preview) return;
  stage.every(ms, (i) => {
    const step = steps[i % steps.length] ?? {};
    for (const [name, value] of Object.entries(step)) view.signal(name, value);
    return view.runAsync().then(() => undefined);
  });
}
