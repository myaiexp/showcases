// Sample data shared by the Pie, Rose, Radar, Gauge, Progress, Liquid and Funnel examples
import { pick, rng } from './components-data.ts';

export interface Slice {
  type: string;
  value: number;
}

/** Surface element content, the data set the Pie guide page uses. */
export const ELEMENTS: Slice[] = [
  { type: 'oxygen', value: 46.6 },
  { type: 'silicon', value: 27.72 },
  { type: 'aluminum', value: 8.13 },
  { type: 'iron', value: 5 },
  { type: 'calcium', value: 3.63 },
  { type: 'sodium', value: 2.83 },
  { type: 'potassium', value: 2.59 },
  { type: 'others', value: 3.5 },
];

/** Returns a function that gives the items with every value rescaled at random, a new set on each call. */
export function jitterer<T extends { value: number }>(items: readonly T[], seed = 5, spread = 0.6): () => T[] {
  const r = rng(seed);
  return () => items.map((d) => ({ ...d, value: Math.round(d.value * (1 - spread / 2 + r() * spread) * 100) / 100 }));
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface MonthRow {
  month: string;
  value: number;
  type: string;
}

/** One value per (month, type) pair for the rose and radar charts. */
export function monthRows(types: readonly string[] = ['A', 'B', 'C'], months: readonly string[] = MONTHS, seed = 9): MonthRow[] {
  const r = rng(seed);
  return types.flatMap((type) => months.map((month) => ({ month, type, value: Math.round(20 + r() * 70) })));
}

/** The same rows with every value moved a little, for previews that keep animating. */
export function nudgeRows(rows: readonly MonthRow[], r: () => number): MonthRow[] {
  return rows.map((d) => ({ ...d, value: Math.max(5, Math.round(d.value + (r() - 0.5) * 40)) }));
}

export { pick, rng };
