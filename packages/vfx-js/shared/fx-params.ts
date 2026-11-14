// Slider rows for an effect's numeric params, and a sine sweep for cards
import { slider } from './controls.ts';

/** One slider: the param key, its range and step. */
export type Spec<P> = readonly [key: keyof P & string, min: number, max: number, step: number];

/**
 * A slider per spec, each writing `params[key]` (or calling `apply(key, value)` when the
 * effect wants `setParams`). Returns the sliders by key.
 */
export function paramSliders<P extends object>(
  bar: HTMLElement,
  params: P,
  specs: readonly Spec<P>[],
  apply?: (key: keyof P & string, value: number) => void,
): Record<string, HTMLInputElement> {
  const out: Record<string, HTMLInputElement> = {};
  for (const [key, min, max, step] of specs) {
    const start = Number((params as Record<string, unknown>)[key]);
    out[key] = slider(bar, key, min, max, step, start, (v) => {
      if (apply) apply(key, v);
      else (params as Record<string, unknown>)[key] = v;
    });
  }
  return out;
}

/** A value that sweeps between `lo` and `hi` as `t` (seconds) advances, one round per `period` seconds. */
export function sweep(t: number, lo: number, hi: number, period = 6): number {
  return lo + (hi - lo) * (0.5 + 0.5 * Math.sin((t * Math.PI * 2) / period));
}
