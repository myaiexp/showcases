// Mount helper for examples that re-render one spec as a few settings change
import type { MountContext } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, type Chart, type ChartOptions } from './chart.ts';

export interface Live<S> {
  /** The current settings; read them inside the controls' callbacks. */
  state: S;
  /** Merge a patch into the settings and redraw. */
  set(patch: Partial<S>): void;
  /** The live chart (replaced on every redraw in 'rebuild' mode). */
  chart(): Chart;
}

export interface LiveOptions<S> {
  initial: S;
  /** Builds the whole spec from the settings. */
  build(state: S, preview: boolean): ISpec;
  /** Full view only: add controls to the bar. */
  controls?(bar: HTMLElement, live: Live<S>): void;
  /** Card only: the next settings, called every `previewMs`. */
  step?(state: S, i: number): Partial<S>;
  previewMs?: number;
  /**
   * 'update' calls updateSpec on the same instance (morphing animations);
   * 'rebuild' makes a fresh instance, for settings that remove keys from the spec.
   */
  mode?: 'update' | 'rebuild';
  chart?: ChartOptions;
}

/** Creates the chart, wires the controls or the preview loop, and returns the cleanup. */
export function mountLive<S extends object>(el: HTMLElement, ctx: MountContext, opts: LiveOptions<S>): () => void {
  const bar = ctx.preview ? null : controlBar(el);
  let state = opts.initial;
  let chart = createChart(el, ctx, opts.build(state, ctx.preview), opts.chart);
  let alive = true;
  const live: Live<S> = {
    get state() {
      return state;
    },
    set(patch) {
      if (!alive) return;
      state = { ...state, ...patch };
      if ((opts.mode ?? 'update') === 'rebuild') {
        chart.release();
        chart = createChart(el, ctx, opts.build(state, ctx.preview), opts.chart);
      } else {
        void chart.vchart.updateSpec(opts.build(state, ctx.preview));
      }
    },
    chart: () => chart,
  };
  let stop = (): void => {};
  if (bar) opts.controls?.(bar, live);
  else if (opts.step) {
    let i = 0;
    const step = opts.step;
    stop = every(opts.previewMs ?? 1800, () => live.set(step(state, ++i)));
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
}
