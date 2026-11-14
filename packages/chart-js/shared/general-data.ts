// Sample data for General and Configuration examples: drinks, records, sensor
import { seeded } from './data.ts';

/** Cups sold per month, first half of the year: [name, figures]. */
export const DRINK_SETS: readonly (readonly [string, readonly number[]])[] = [
  ['Espresso', [420, 450, 510, 480, 560, 610]],
  ['Filter', [300, 320, 290, 340, 330, 360]],
  ['Cold brew', [60, 90, 160, 240, 330, 420]],
  ['Tea', [180, 170, 190, 150, 120, 110]],
  ['Hot chocolate', [210, 190, 140, 90, 50, 30]],
];

/** One row of a "table": what a spreadsheet export or an API would hand you. */
export interface MonthRecord {
  month: string;
  online: number;
  store: number;
  returns: number;
}

export const RECORDS: MonthRecord[] = [
  { month: 'Jan', online: 120, store: 90, returns: 8 },
  { month: 'Feb', online: 135, store: 84, returns: 11 },
  { month: 'Mar', online: 160, store: 97, returns: 9 },
  { month: 'Apr', online: 154, store: 110, returns: 14 },
  { month: 'May', online: 188, store: 121, returns: 12 },
  { month: 'Jun', online: 205, store: 118, returns: 17 },
];

export interface XY {
  x: number;
  y: number;
}

const cache = new Map<number, XY[]>();

/**
 * A temperature sensor sampled `n` times: a slow daily wave, noise, and a few sharp
 * spikes (a door opening). Sorted by x with unique x, so it needs no parsing.
 */
export function sensorSignal(n: number): XY[] {
  const hit = cache.get(n);
  if (hit) return hit;
  const rand = seeded(11);
  const out: XY[] = [];
  let noise = 0;
  for (let i = 0; i < n; i++) {
    noise = noise * 0.9 + (rand() - 0.5) * 0.6;
    const wave = 21 + 3 * Math.sin((i / n) * Math.PI * 6) + 1.2 * Math.sin((i / n) * Math.PI * 41);
    const spike = rand() < 4 / n ? 5 + rand() * 4 : 0;
    out.push({ x: i, y: Math.round((wave + noise + spike) * 100) / 100 });
  }
  cache.set(n, out);
  return out;
}
