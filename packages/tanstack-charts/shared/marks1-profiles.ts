// Prepared profile rows (binned counts scaled to 0..1) for ridgeline and violin examples
import { binX, binY, normalize } from '@tanstack/charts';
import type { Observation } from './marks1-data.ts';

export interface ProfileRow {
  group: string;
  /** Bin centre along the profile axis. */
  position: number;
  /** Count divided by the largest count in the group, in [0, 1]. */
  height: number;
}

/** Histogram profiles per group over fixed boundaries, scaled so each group peaks at 1. */
export function profiles(rows: readonly Observation[], thresholds: readonly number[]): ProfileRow[] {
  const bins = binX(rows, {
    value: 'value',
    by: 'group',
    thresholds,
    outputs: { count: { reduce: 'count' } },
  });
  return normalize(bins, { value: 'count', by: 'group', basis: 'max', as: 'height' }).map((row) => ({
    group: row.group,
    position: row.x,
    height: row.height,
  }));
}

/** The same profiles from binY, for examples that are about the vertical form. */
export function profilesY(rows: readonly Observation[], thresholds: readonly number[]): ProfileRow[] {
  const bins = binY(rows, {
    value: 'value',
    by: 'group',
    thresholds,
    outputs: { count: { reduce: 'count' } },
  });
  return normalize(bins, { value: 'count', by: 'group', basis: 'max', as: 'height' }).map((row) => ({
    group: row.group,
    position: row.y,
    height: row.height,
  }));
}

/** Evenly spaced boundaries from `from` to `to`. */
export function boundaries(from: number, to: number, step: number): number[] {
  const out: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) out.push(Math.round(v * 1000) / 1000);
  return out;
}
