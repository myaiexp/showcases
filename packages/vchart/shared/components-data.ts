// Sample data and preview drivers shared by the Concepts: Components examples
import { every } from './chart.ts';
import type { IVChart } from './chart.ts';

/** A small seeded random generator, so every load draws the same chart. */
export function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Indexes an array that is known to be non-empty (the project compiles with noUncheckedIndexedAccess). */
export function pick<T>(items: readonly T[], i: number): T {
  return items[((i % items.length) + items.length) % items.length] as T;
}

export interface Row {
  x: string;
  y: number;
  c: string;
}

export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
export const GROUPS = ['North', 'South', 'East', 'West'];

/** One value per (category, group) pair: the {x, y, c} shape used by grouped bar and line specs. */
export function groupedRows(cats: readonly string[] = QUARTERS, groups: readonly string[] = GROUPS, seed = 7): Row[] {
  const r = rng(seed);
  return groups.flatMap((c) => cats.map((x) => ({ x, y: Math.round(20 + r() * 60), c })));
}

/** A random walk of `n` points with the labels D01, D02 ... */
export function walk(n: number, seed = 3, group = 'Series'): Row[] {
  const r = rng(seed);
  let y = 50;
  return Array.from({ length: n }, (_, i) => {
    y = Math.max(5, Math.min(95, y + (r() - 0.5) * 24));
    return { x: `D${String(i + 1).padStart(2, '0')}`, y: Math.round(y), c: group };
  });
}

export interface Point {
  x: number;
  y: number;
  size: number;
  type: string;
}

/** Scatter points in three clusters, with a size and a type. */
export function scatterPoints(n = 60, seed = 11): Point[] {
  const r = rng(seed);
  const types = ['Alpha', 'Beta', 'Gamma'];
  return Array.from({ length: n }, (_, i) => {
    const type = pick(types, i);
    const cx = 25 + (i % 3) * 25;
    return {
      x: Math.round(cx + (r() - 0.5) * 30),
      y: Math.round(30 + (r() - 0.5) * 50 + (i % 3) * 12),
      size: Math.round(10 + r() * 90),
      type,
    };
  });
}

/**
 * Preview driver for hover components: walks setDimensionIndex over `labels`, which shows the
 * dimension tooltip and the crosshair without a pointer (api/vchart.md § setDimensionIndex).
 */
export function dimensionTour(vchart: IVChart, labels: readonly string[], ms = 1100, options: Parameters<IVChart['setDimensionIndex']>[1] = {}): () => void {
  let i = 0;
  return every(ms, () => {
    vchart.setDimensionIndex(pick(labels, i), options);
    i += 1;
  });
}

/** A DataZoom / ScrollBar component of the rendered chart, with the method the chart types leave out. */
export interface WindowComponent {
  setStartAndEnd(start: number | string, end: number | string, rangeMode?: ['percent' | 'value', 'percent' | 'value']): void;
}

/** Looks the component up on every call, so it survives updateSpec rebuilding the chart. */
export function windowComponent(vchart: IVChart, key: 'dataZoom' | 'scrollBar'): WindowComponent | undefined {
  return vchart.getChart()?.getComponentsByKey(key)[0] as unknown as WindowComponent | undefined;
}

/** Slides a window of `span` (0-1 of the data) back and forth, for hover-free previews. */
export function slideWindow(vchart: IVChart, key: 'dataZoom' | 'scrollBar', span = 0.3, ms = 90): () => void {
  let t = 0;
  return every(ms, () => {
    t += 1;
    const start = ((1 - Math.cos(t / 22)) / 2) * (1 - span);
    windowComponent(vchart, key)?.setStartAndEnd(start, start + span);
  });
}

/**
 * Plays a drag across a chart's canvas through dispatched pointer events, so the previews of
 * brush-style interaction can draw a selection without a real pointer. `path` is in fractions
 * of the canvas size. After the drag it waits `hold` ms; `onDone` then runs (to clear it).
 */
export function simulateDrag(container: HTMLElement, path: readonly (readonly [number, number])[], opts: { stepMs?: number; onDone?: () => void; holdMs?: number } = {}): () => void {
  const { stepMs = 45, holdMs = 1400, onDone } = opts;
  const timers: number[] = [];
  const canvas = container.querySelector('canvas');
  if (!canvas) return () => {};
  const fire = (type: string, [fx, fy]: readonly [number, number]): void => {
    const rect = canvas.getBoundingClientRect();
    const init: PointerEventInit = {
      bubbles: true,
      cancelable: true,
      clientX: rect.left + fx * rect.width,
      clientY: rect.top + fy * rect.height,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
      button: 0,
      buttons: type === 'pointerup' ? 0 : 1,
    };
    canvas.dispatchEvent(new PointerEvent(type, init));
  };
  path.forEach((point, i) => {
    timers.push(window.setTimeout(() => fire(i === 0 ? 'pointerdown' : 'pointermove', point), i * stepMs));
  });
  const last = path[path.length - 1];
  if (last) timers.push(window.setTimeout(() => fire('pointerup', last), path.length * stepMs));
  if (onDone) timers.push(window.setTimeout(onDone, path.length * stepMs + holdMs));
  return () => timers.forEach((t) => window.clearTimeout(t));
}

/** A straight drag from `a` to `b` as a path of `steps` points. */
export function line(a: readonly [number, number], b: readonly [number, number], steps = 14): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / steps, a[1] + ((b[1] - a[1]) * i) / steps]);
}
