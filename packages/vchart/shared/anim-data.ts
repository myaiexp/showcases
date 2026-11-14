// Shared helpers for Animation, Layout and Custom Extension examples
import type { MountContext } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, type Chart, type ChartOptions } from './chart.ts';
import { pick, rng } from './components-data.ts';

export const GUIDE = 'repo/docs/assets/guide/en/tutorial_docs';
export const ANIM_TYPES = `${GUIDE}/Animation/Animation_Types.md`;
export const ANIM_ATTRS = `${GUIDE}/Animation/Animation_Attributes_and_Settings.md`;
export const ANIM_CHOREO = `${GUIDE}/Animation/Configuration_and_Choreography_of_Complex_Animations.md`;
export const ANIM_CASES = `${GUIDE}/Animation/Animation_Cases.md`;
export const ANIM_OPTION = 'repo/docs/assets/option/en/animate/animation.md';
export const ANIM_MARK_OPTION = 'repo/docs/assets/option/en/animate/mark-animate.md';
export const ANIM_STATE_OPTION = 'repo/docs/assets/option/en/animate/state-animate.md';

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const EASINGS = [
  'linear', 'quadIn', 'quadOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'quintInOut', 'backOut', 'circOut',
  'bounceOut', 'bounceIn', 'elasticOut', 'elasticIn',
] as const;

/** One value per weekday, the same every call for a given seed. */
export function weekdayRows(seed = 5, days: readonly string[] = DAYS): { day: string; sales: number }[] {
  // A small LCG seed gives near-identical first values, so spread the seeds first.
  const r = rng(Math.imul(seed, 2654435761) >>> 0);
  return days.map((day) => ({ day, sales: Math.round(14 + r() * 36) }));
}

/** A fresh batch of categories with random values: the count and the names change, so bars enter and exit. */
export function randomCategories(seed: number, min = 3, max = 8): { name: string; value: number }[] {
  const r = rng(seed * 7919 + 13);
  const n = min + Math.floor(r() * (max - min + 1));
  const pool = ['Alder', 'Birch', 'Cedar', 'Dogwood', 'Elm', 'Fir', 'Ginkgo', 'Hazel', 'Ivy', 'Juniper'];
  const start = Math.floor(r() * 3);
  return Array.from({ length: n }, (_, i) => ({ name: pick(pool, start + i), value: Math.round(10 + r() * 80) }));
}

export interface ReplayOptions<S extends object> {
  initial: S;
  /** Builds the whole spec from the settings. */
  build(state: S, preview: boolean): ISpec;
  /** Milliseconds between replays: longer than the animation itself. */
  period: number;
  /** Full view: add controls; call `set` to change a setting (the chart replays at once). */
  controls?(bar: HTMLElement, set: (patch: Partial<S>) => void, state: () => S): void;
  /** Card: the settings for replay number `i`. */
  step?(state: S, i: number): Partial<S>;
  init?: ChartOptions['init'];
  height?: number;
  /** Called after each (re)build, with the live chart. */
  onChart?(chart: Chart, state: S): void;
}

/**
 * Appear animations play once, when a chart is created, so a replay loop releases the chart
 * and builds a new one on the same sized holder every `period` ms. Returns the cleanup.
 */
export function mountReplay<S extends object>(el: HTMLElement, ctx: MountContext, o: ReplayOptions<S>): () => void {
  const holder = document.createElement('div');
  holder.style.width = '100%';
  holder.style.height = `${ctx.preview ? 200 : (o.height ?? 420)}px`;
  el.append(holder);
  let state = o.initial;
  let chart: Chart | null = null;
  const rebuild = (): void => {
    chart?.release();
    chart = createChart(el, ctx, o.build(state, ctx.preview), { parent: holder, height: o.height, init: o.init });
    o.onChart?.(chart, state);
  };
  let stop = (): void => {};
  let n = 0;
  const start = (): void => {
    stop();
    stop = every(o.period, () => {
      if (ctx.preview && o.step) state = { ...state, ...o.step(state, ++n) };
      rebuild();
    });
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.insertBefore(bar, holder);
    const set = (patch: Partial<S>): void => {
      state = { ...state, ...patch };
      rebuild();
      start();
    };
    button(bar, 'Replay', () => {
      rebuild();
      start();
    });
    o.controls?.(bar, set, () => state);
  }
  rebuild();
  start();
  return () => {
    stop();
    chart?.release();
    chart = null;
    holder.remove();
  };
}
