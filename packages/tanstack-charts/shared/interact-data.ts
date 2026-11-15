// Small datasets for the tooltip, focus, cursor and selection examples
import { normal, rng } from './random.ts';

export interface Week {
  id: string;
  week: string;
  value: number;
  status: 'ok' | 'watch' | 'risk';
  change: number;
}

/** Eight weeks of active users with a status and a week-on-week change. */
export const weeks: readonly Week[] = [
  { id: 'w1', week: 'May 4', value: 820, status: 'ok', change: 0.04 },
  { id: 'w2', week: 'May 11', value: 960, status: 'ok', change: 0.17 },
  { id: 'w3', week: 'May 18', value: 1140, status: 'ok', change: 0.19 },
  { id: 'w4', week: 'May 25', value: 1280, status: 'watch', change: 0.12 },
  { id: 'w5', week: 'Jun 1', value: 1210, status: 'watch', change: -0.05 },
  { id: 'w6', week: 'Jun 8', value: 1390, status: 'ok', change: 0.15 },
  { id: 'w7', week: 'Jun 15', value: 1330, status: 'risk', change: -0.04 },
  { id: 'w8', week: 'Jun 22', value: 1510, status: 'ok', change: 0.14 },
];

export const seriesNames = ['Web', 'Mobile', 'API'] as const;
export type SeriesName = (typeof seriesNames)[number];

export interface Traffic {
  id: string;
  date: Date;
  month: string;
  series: SeriesName;
  value: number;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const base: Record<SeriesName, readonly number[]> = {
  Web: [62, 66, 71, 69, 75, 82, 80, 88, 93, 91, 99, 104],
  Mobile: [30, 36, 41, 48, 52, 61, 70, 74, 85, 93, 98, 110],
  API: [18, 19, 24, 22, 29, 31, 36, 35, 41, 47, 46, 54],
};

/** Twelve months of requests (thousands) for three series, one row per month and series. */
export const traffic: readonly Traffic[] = monthNames.flatMap((month, m) =>
  seriesNames.map((series) => ({ id: `${series}-${m}`, date: new Date(Date.UTC(2025, m, 1)), month, series, value: base[series][m]! })),
);

export interface Blob {
  id: string;
  x: number;
  y: number;
  group: 'A' | 'B' | 'C';
}

/** `n` seeded scatter points in three loose clusters. */
export function scatter(n: number, seed = 7): Blob[] {
  const random = rng(seed);
  const spread = normal(random, 0, 1);
  const centres = { A: [28, 62], B: [55, 38], C: [74, 70] } as const;
  const groups = ['A', 'B', 'C'] as const;
  return Array.from({ length: n }, (_, i) => {
    const group = groups[i % 3]!;
    const [cx, cy] = centres[group];
    return { id: `p${i}`, group, x: Math.round((cx + spread() * 8) * 10) / 10, y: Math.round((cy + spread() * 8) * 10) / 10 };
  });
}

export interface Product {
  id: string;
  product: string;
  revenue: number;
  region: 'North' | 'South';
  units: number;
}

export const products: readonly Product[] = [
  { id: 'atlas', product: 'Atlas', revenue: 48, region: 'North', units: 320 },
  { id: 'beacon', product: 'Beacon', revenue: 71, region: 'North', units: 410 },
  { id: 'comet', product: 'Comet', revenue: 39, region: 'South', units: 205 },
  { id: 'delta', product: 'Delta', revenue: 86, region: 'South', units: 560 },
  { id: 'ember', product: 'Ember', revenue: 57, region: 'North', units: 290 },
  { id: 'flint', product: 'Flint', revenue: 64, region: 'South', units: 350 },
];

export interface Reading {
  id: string;
  t: number;
  value: number;
}

/** A smooth seeded signal of `n` readings, t = 0 … n - 1. */
export function signal(n: number, seed = 3): Reading[] {
  const random = rng(seed);
  const noise = normal(random, 0, 1.2);
  return Array.from({ length: n }, (_, t) => ({ id: `r${t}`, t, value: Math.round((50 + 22 * Math.sin(t / 7) + 9 * Math.sin(t / 2.3) + noise()) * 10) / 10 }));
}

export interface WeekPoint {
  id: string;
  n: number;
  value: number;
}

/** The eight weeks of active users with a numeric week number, for numeric scales and handles. */
export const weekPoints: readonly WeekPoint[] = weeks.map((w, i) => ({ id: w.id, n: i + 1, value: w.value }));
