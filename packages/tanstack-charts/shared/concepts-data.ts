// Small inline datasets shared by the concept examples
import { days, normal, rng, walk } from './random.ts';

export interface MonthRow {
  month: string;
  value: number;
}

export const signups: readonly MonthRow[] = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 51 },
  { month: 'Apr', value: 73 },
  { month: 'May', value: 86 },
  { month: 'Jun', value: 79 },
];

export interface LetterRow {
  letter: string;
  frequency: number;
}

export const alphabet: readonly LetterRow[] = [
  { letter: 'E', frequency: 0.12702 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'A', frequency: 0.08167 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'N', frequency: 0.06749 },
];

export interface ProductRow {
  id: string;
  product: string;
  revenue: number;
  orders: number;
  returns: number;
}

export const products: readonly ProductRow[] = [
  { id: 'p1', product: 'Anvil', revenue: 128, orders: 340, returns: 12 },
  { id: 'p2', product: 'Beacon', revenue: 214, orders: 190, returns: 30 },
  { id: 'p3', product: 'Compass', revenue: 96, orders: 410, returns: 8 },
  { id: 'p4', product: 'Dynamo', revenue: 175, orders: 260, returns: 21 },
  { id: 'p5', product: 'Engine', revenue: 242, orders: 150, returns: 17 },
  { id: 'p6', product: 'Flywheel', revenue: 63, orders: 305, returns: 5 },
];

export interface SeriesRow {
  id: string;
  date: Date;
  region: string;
  value: number;
}

export const regions = ['North', 'South', 'West'] as const;
export const regionColors = ['#60a5fa', '#fb923c', '#4ade80'] as const;

/** Three regional weekly series, 24 weeks each. */
export function regionalSeries(seed = 7, weeks = 24): SeriesRow[] {
  const random = rng(seed);
  const out: SeriesRow[] = [];
  regions.forEach((region, r) => {
    const values = walk(random, weeks, 60 + r * 25, 4);
    days('2026-01-05', weeks * 7)
      .filter((_, i) => i % 7 === 0)
      .forEach((date, i) => out.push({ id: `${region}-${i}`, date, region, value: values[i]! }));
  });
  return out;
}

export interface PointRow {
  id: string;
  group: string;
  x: number;
  y: number;
  size: number;
}

/** Scatter rows in three clusters with a third quantitative value. */
export function clusters(seed = 11, perGroup = 24): PointRow[] {
  const random = rng(seed);
  const out: PointRow[] = [];
  const centers: [string, number, number][] = [['Adelie', 38, 18.5], ['Chinstrap', 49, 18], ['Gentoo', 47, 14.8]];
  for (const [group, cx, cy] of centers) {
    const nx = normal(random, cx, 1.8);
    const ny = normal(random, cy, 0.9);
    for (let i = 0; i < perGroup; i++) {
      out.push({ id: `${group}-${i}`, group, x: nx(), y: ny(), size: 2800 + random() * 2800 });
    }
  }
  return out;
}
