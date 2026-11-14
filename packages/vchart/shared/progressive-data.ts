// Seeded large datasets and a rebuilding mount for progressive demos
import type { MountContext } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, type Chart } from './chart.ts';
import { rng } from './components-data.ts';

/** `n` rows {time, value} around `base`, seeded so every run draws the same series. */
export function series(n: number, base: number, seed: number, spread = 200): { time: number; value: number }[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, time) => ({ time, value: Math.floor(r() * spread) + base }));
}

/** Rows {x, type, y} for a grouped area chart: `n` points per group. */
export function groupedSeries(n: number, groups: readonly string[], seed: number): { x: number; type: string; y: number }[] {
  const r = rng(seed);
  return groups.flatMap((type, g) => Array.from({ length: n }, (_, x) => ({ x, type, y: Math.floor(r() * 300) + 400 + g * 250 })));
}

export interface ProgressiveOptions<S> {
  initial: S;
  /** Spec for a state; `preview` is true in a gallery card. */
  build(state: S, preview: boolean): ISpec;
  /** Full view: add controls; call `set` with a patch to rebuild. */
  controls?(bar: HTMLElement, state: S, set: (patch: Partial<S>) => void): void;
  /** Card: next patch every `previewMs`. */
  step?(state: S, i: number): Partial<S>;
  previewMs?: number;
  chartHeight?: number;
}

/**
 * Builds the chart from a state and rebuilds it (release, new instance) whenever the state
 * changes, because progressive rendering decides at render time. The full view shows how long
 * renderSync took and when the renderFinished events arrived.
 */
export function mountProgressive<S extends object>(el: HTMLElement, ctx: MountContext, opts: ProgressiveOptions<S>): () => void {
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let state = opts.initial;
  let chart: Chart | undefined;
  let alive = true;

  const make = (): void => {
    chart?.release();
    const t0 = performance.now();
    chart = createChart(el, ctx, opts.build(state, ctx.preview), { height: opts.chartHeight, previewHeight: 200 });
    const t1 = performance.now();
    if (!out) return;
    let finished = 0;
    out.textContent = `renderSync: ${Math.round(t1 - t0)} ms`;
    chart.vchart.on('renderFinished', () => {
      if (!alive) return;
      finished += 1;
      out.textContent = `renderSync: ${Math.round(t1 - t0)} ms\nrenderFinished events: ${finished}, the last ${Math.round(performance.now() - t0)} ms after the render call`;
    });
  };
  const set = (patch: Partial<S>): void => {
    if (!alive) return;
    state = { ...state, ...patch };
    make();
  };
  make();

  let stop = (): void => {};
  if (bar) opts.controls?.(bar, state, set);
  else if (opts.step) {
    let i = 0;
    const step = opts.step;
    stop = every(opts.previewMs ?? 2600, () => set(step(state, ++i)));
  }
  return () => {
    alive = false;
    stop();
    chart?.release();
  };
}
