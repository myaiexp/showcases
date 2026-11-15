// Loosely typed restyle/relayout and a cyclic picker for the Basic Charts examples
import Plotly from 'plotly.js';
import type { PlotlyHTMLElement } from 'plotly.js';

type Gd = PlotlyHTMLElement | HTMLElement;

/**
 * Plotly.restyle with per-trace arrays: the typings only accept one trace's values per
 * attribute, but restyle takes an array with one entry per target trace.
 * Resolves quietly when the plot was purged while the call was pending.
 */
export function restyle(gd: Gd, update: Record<string, unknown>, traces?: number | number[]): Promise<void> {
  const fn = Plotly.restyle as unknown as (gd: Gd, u: Record<string, unknown>, t?: number | number[]) => Promise<unknown>;
  return fn(gd, update, traces).then(
    () => undefined,
    () => undefined,
  );
}

/** Plotly.relayout with attribute-path keys of any value type. */
export function relayout(gd: Gd, update: Record<string, unknown>): Promise<void> {
  const fn = Plotly.relayout as unknown as (gd: Gd, u: Record<string, unknown>) => Promise<unknown>;
  return fn(gd, update).then(
    () => undefined,
    () => undefined,
  );
}

/** The i-th item of a list, wrapping around, typed without undefined. */
export function pick<T>(list: readonly T[], i: number): T {
  return list[((i % list.length) + list.length) % list.length] as T;
}
