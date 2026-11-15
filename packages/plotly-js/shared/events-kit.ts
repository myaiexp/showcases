// Helpers for the Chart Events, Controls, Animations and Streaming examples
import Plotly from 'plotly.js';
import { gauss, rng } from './stat-data.ts';

/** The parts of a plotly event payload the examples read (the bundled types are narrower). */
export interface EvPoint {
  curveNumber: number;
  pointNumber: number;
  pointNumbers?: number[];
  pointIndex?: number;
  x?: number | string;
  y?: number | string;
  z?: number;
  lat?: number;
  lon?: number;
  label?: string;
  xPixel?: number;
  yPixel?: number;
  data: { name?: string; marker?: { color?: unknown } };
  xaxis?: { l2p: (v: number) => number };
  yaxis?: { l2p: (v: number) => number };
}
export interface Ev {
  points: EvPoint[];
  xvals?: number[];
  yvals?: number[];
  xPixel?: number;
  yPixel?: number;
  event?: unknown;
}

/** Loosely typed view of a payload: handlers read it, never the other way round. */
export const asEv = (raw: unknown): Ev => raw as Ev;

/** n seeded normal draws around a mean: the docs' d3.range(N).map(d3.random.normal(mean)). */
export function normals(seed: number, n: number, mean = 0, sd = 1): number[] {
  const g = gauss(rng(seed));
  return Array.from({ length: n }, () => mean + sd * g());
}

/** A number as a short string, 4 significant digits. */
export const sig = (v: unknown): string => (typeof v === 'number' ? String(Number(v.toPrecision(4))) : String(v));

/** One point as one short line of the fields a handler cares about. */
export const line = (p: EvPoint): string =>
  `${p.data.name ?? 'trace ' + p.curveNumber} #${p.pointNumber}: x=${sig(p.x)}, y=${sig(p.y)}`;

/** The i-th item, wrapping. */
export const at = <T>(list: readonly T[], i: number): T => list[((i % list.length) + list.length) % list.length] as T;

interface Out {
  set(text: string): void;
}

/**
 * Where an example prints what a handler received: the read-out under the graph in the
 * full view, a small overlay in the corner of the graph in a card (cards have no room for
 * a read-out, and the handler's effect is the point).
 */
export function output(stage: { div: HTMLElement; preview: boolean }, el: HTMLElement): Out {
  if (!stage.preview) {
    const pre = document.createElement('pre');
    pre.className = 'pl-readout';
    el.append(pre);
    return { set: (text) => (pre.textContent = text) };
  }
  const tag = document.createElement('div');
  tag.style.cssText =
    'position:absolute;left:8px;bottom:6px;font:11px/1.3 ui-monospace,monospace;color:#cbd5e1;background:rgba(15,17,21,.72);padding:2px 6px;border-radius:4px;pointer-events:none;white-space:pre';
  stage.div.style.position = 'relative';
  stage.div.append(tag);
  return { set: (text) => (tag.textContent = text) };
}

/**
 * A click or hover payload built from the figure's own data: cards have no pointer, so a
 * handler is fed what Plotly would have handed it for the point a reader would have used.
 */
export function fakeEv(div: { data: unknown }, picks: [curve: number, point: number][]): Ev {
  const traces = div.data as { x?: (number | string)[]; y?: (number | string)[]; name?: string; marker?: { color?: unknown } }[];
  return {
    points: picks.map(([curveNumber, pointNumber]) => {
      const data = traces[curveNumber] ?? {};
      return { curveNumber, pointNumber, x: data.x?.[pointNumber], y: data.y?.[pointNumber], data };
    }),
  };
}

/** The Mt Bruno elevation grid (24 by 24) the button examples draw as surface, heatmap or contour. */
export async function mtBruno(): Promise<number[][]> {
  const { csv, unpackNum } = await import('./data.ts');
  const rows = await csv('api_docs/mt_bruno_elevation.csv');
  return Array.from({ length: 24 }, (_, i) => unpackNum(rows, String(i)));
}

/** An updatemenus button or slider step: the method and the args it hands to Plotly. */
export interface Btn {
  label: string;
  method: 'restyle' | 'relayout' | 'update' | 'animate';
  args: unknown[];
}

/**
 * Runs a button's command the way the menu would: Plotly[method](gd, ...args). Cards have
 * no pointer, so they cycle their menus by applying the buttons' own args.
 */
export function applyButton(div: unknown, b: Pick<Btn, 'method' | 'args'>): Promise<unknown> {
  const api = Plotly as unknown as Record<string, (...a: unknown[]) => Promise<unknown>>;
  return Promise.resolve(api[b.method]!(div, ...b.args)).catch(() => undefined);
}
