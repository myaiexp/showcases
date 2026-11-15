// Seeded sample data for the transform examples
import { normal, rng, walk } from './random.ts';

export interface Order {
  id: string;
  region: string;
  createdAt: Date;
  amount: number;
  margin: number;
}

const DAY = 86_400_000;
const START = Date.parse('2025-01-01T00:00:00Z');

/** Orders over `n` days for three regions, a few per day each, with an upward drift. */
export function makeOrders(n = 90, seed = 5): Order[] {
  const random = rng(seed);
  const amount = normal(random, 60, 18);
  const rows: Order[] = [];
  for (const [region, scale] of [['North', 1], ['South', 0.8], ['West', 1.3]] as const) {
    for (let d = 0; d < n; d++) {
      const count = 1 + Math.floor(random() * 3);
      for (let k = 0; k < count; k++) {
        const a = Math.max(8, amount() * scale * (1 + d / 220));
        rows.push({
          id: `${region}-${d}-${k}`,
          region,
          createdAt: new Date(START + d * DAY + Math.floor(random() * 20) * 3_600_000),
          amount: Math.round(a * 100) / 100,
          margin: Math.round((random() - 0.3) * 100) / 100,
        });
      }
    }
  }
  return rows;
}

export interface Service {
  service: string;
  latency: number;
  throughput: number;
  errors: number;
}

/** Wide rows: one row per service with three measurements. */
export const services: readonly Service[] = [
  { service: 'auth', latency: 120, throughput: 900, errors: 4 },
  { service: 'search', latency: 340, throughput: 450, errors: 11 },
  { service: 'billing', latency: 210, throughput: 200, errors: 2 },
  { service: 'media', latency: 480, throughput: 1300, errors: 7 },
];

export interface Quarter {
  quarter: string;
  product: string;
  revenue: number;
}

/** Revenue by quarter and product, long form. */
export const quarters: readonly Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((quarter, i) => [
  { quarter, product: 'Basic', revenue: [30, 34, 33, 41][i]! },
  { quarter, product: 'Pro', revenue: [22, 29, 38, 44][i]! },
  { quarter, product: 'Team', revenue: [10, 14, 21, 25][i]! },
]);

export interface Latency {
  id: string;
  service: string;
  latency: number;
}

/** Right-skewed latencies in milliseconds for two services. */
export function makeLatencies(n = 300, seed = 17): Latency[] {
  const random = rng(seed);
  const z = normal(random);
  return Array.from({ length: n }, (_, i) => {
    const service = i % 3 === 0 ? 'search' : 'auth';
    const base = service === 'search' ? 4.9 : 4.3;
    return { id: `l${i}`, service, latency: Math.round(Math.exp(base + 0.35 * z()) * 10) / 10 };
  });
}

export interface Dot {
  id: string;
  group: string;
  x: number;
  y: number;
  weight: number;
}

/** Scatter points in two overlapping clusters. */
export function makeDots(n = 200, seed = 9): Dot[] {
  const random = rng(seed);
  const gx = normal(random);
  return Array.from({ length: n }, (_, i) => {
    const group = i % 2 ? 'B' : 'A';
    const x = (group === 'A' ? 35 : 60) + gx() * 12;
    const y = 0.6 * x + (group === 'A' ? 10 : 0) + gx() * 8;
    return { id: `d${i}`, group, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, weight: Math.round(random() * 9 + 1) };
  });
}

export interface Tick {
  day: number;
  series: string;
  value: number;
}

/** Noisy daily values for two series. */
export function makeSeries(n = 60, seed = 21): Tick[] {
  const random = rng(seed);
  const rows: Tick[] = [];
  for (const [series, start] of [['alpha', 50], ['beta', 35]] as const) {
    walk(random, n, start, 4).forEach((value, day) => rows.push({ day, series, value }));
  }
  return rows;
}

export interface Budget {
  step: string;
  change: number;
}

/** Signed monthly changes for a bridge from opening to closing balance. */
export const changes: readonly Budget[] = [
  { step: 'Sales', change: 120 },
  { step: 'Refunds', change: -35 },
  { step: 'Services', change: 48 },
  { step: 'Rent', change: -60 },
  { step: 'Staff', change: -85 },
  { step: 'Grants', change: 40 },
];

export interface Response {
  question: string;
  response: string;
}

export const scale = ['Disagree', 'Neutral', 'Agree'] as const;

/** Raw survey answers: each question has its own lean, so the mosaic cells differ in size. */
export function makeResponses(seed = 41): Response[] {
  const random = rng(seed);
  const leans: Record<string, readonly [number, number]> = { Pay: [0.35, 0.3], Hours: [0.2, 0.3], Team: [0.1, 0.2], Tools: [0.3, 0.45] };
  const sizes: Record<string, number> = { Pay: 120, Hours: 80, Team: 140, Tools: 60 };
  const rows: Response[] = [];
  for (const [question, [dis, neu]] of Object.entries(leans)) {
    for (let i = 0; i < sizes[question]!; i++) {
      const r = random();
      rows.push({ question, response: r < dis ? 'Disagree' : r < dis + neu ? 'Neutral' : 'Agree' });
    }
  }
  return rows;
}

export interface QuartetPoint {
  id: string;
  set: string;
  x: number;
  y: number;
}

/** Four point sets with a similar line but different shapes. */
export function makeQuartet(seed = 63): QuartetPoint[] {
  const random = rng(seed);
  const noise = normal(random, 0, 1);
  const rows: QuartetPoint[] = [];
  const shapes: Record<string, (t: number) => readonly [number, number]> = {
    line: (t) => [4 + t * 10, 3 + 0.5 * (4 + t * 10) + noise() * 0.9],
    curve: (t) => [4 + t * 10, 3 + 0.5 * (4 + t * 10) - 0.11 * (t * 10 - 5) ** 2 + 1.4 + noise() * 0.2],
    outlier: (t) => [t < 0.9 ? 8 : 13, t < 0.9 ? 6 + (t - 0.5) * 2 + noise() * 0.5 : 12.7],
    vertical: (t) => [t < 0.9 ? 8 : 19, t < 0.9 ? 4 + t * 8 : 12.5],
  };
  for (const [set, shape] of Object.entries(shapes)) {
    for (let i = 0; i < 11; i++) {
      const [x, y] = shape(i / 10);
      rows.push({ id: `${set}${i}`, set, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    }
  }
  return rows;
}
