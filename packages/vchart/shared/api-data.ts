// Shared bits for the API examples: seeded grouped rows, a grouped bar spec, and a small status readout
import { GROUPS, QUARTERS, groupedRows, type Row } from './components-data.ts';
import type { ISpec } from './chart.ts';

export type { Row };
export const CATS = QUARTERS.slice(0, 5);
export const SERIES = GROUPS.slice(0, 3);

/** Rows {x, y, c} for five categories and three series. */
export const rows = (seed: number): Row[] => groupedRows(CATS, SERIES, seed);

/** A grouped bar spec on one data id, with a legend that carries an id for the legend API. */
export function barSpec(opts: { id?: string; seed?: number; legend?: boolean; extra?: Record<string, unknown> } = {}): ISpec {
  return {
    type: 'bar',
    data: [{ id: opts.id ?? 'main', values: rows(opts.seed ?? 1) }],
    xField: ['x', 'c'],
    yField: 'y',
    seriesField: 'c',
    legends: { id: 'legend', visible: opts.legend ?? true, orient: 'top' },
    ...opts.extra,
  } as unknown as ISpec;
}
