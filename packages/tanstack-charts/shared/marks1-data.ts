// Seeded sample rows shared by the mark examples: series over time, grouped observations
import { days, normal, rng, walk } from './random.ts';

export interface SeriesRow {
  date: Date;
  series: string;
  value: number;
}

/** Three random-walk series over `n` consecutive days, one row per series per day. */
export function threeSeries(n = 30, seed = 7): SeriesRow[] {
  const dates = days('2025-03-01', n);
  const random = rng(seed);
  const rows: SeriesRow[] = [];
  const start = { North: 60, South: 45, West: 30 };
  for (const [series, from] of Object.entries(start)) {
    const values = walk(random, n, from, 3);
    dates.forEach((date, i) => rows.push({ date, series, value: Math.max(2, values[i]!) }));
  }
  return rows;
}

export interface Observation {
  group: string;
  value: number;
}

/** Normally distributed measurements per group, each group with its own centre and spread. */
export function groupedObservations(
  groups: Record<string, readonly [mean: number, sd: number, count: number]>,
  seed = 11,
): Observation[] {
  const random = rng(seed);
  const rows: Observation[] = [];
  for (const [group, [mean, sd, count]] of Object.entries(groups)) {
    const draw = normal(random, mean, sd);
    for (let i = 0; i < count; i++) rows.push({ group, value: Math.round(draw() * 10) / 10 });
  }
  return rows;
}

export interface Reading {
  species: string;
  length: number;
  depth: number;
  mass: number;
}

/** Penguin-like readings: three species with their own cluster of length, depth and mass. */
export function readings(perSpecies = 40, seed = 3): Reading[] {
  const random = rng(seed);
  const spec: Record<string, readonly [number, number, number]> = {
    Adelie: [38, 18.3, 3700],
    Chinstrap: [48.8, 18.4, 3730],
    Gentoo: [47.5, 15, 5075],
  };
  const out: Reading[] = [];
  for (const [species, [length, depth, mass]] of Object.entries(spec)) {
    const l = normal(random, length, 2.6);
    const d = normal(random, depth, 1);
    const m = normal(random, mass, 330);
    for (let i = 0; i < perSpecies; i++) {
      out.push({ species, length: Math.round(l() * 10) / 10, depth: Math.round(d() * 10) / 10, mass: Math.round(m() / 25) * 25 });
    }
  }
  return out;
}

export interface Sale {
  quarter: string;
  region: string;
  revenue: number;
}

/** Quarterly revenue for four regions. */
export const sales: readonly Sale[] = ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((quarter, q) =>
  [
    ['North', 40, 6],
    ['South', 28, 4],
    ['East', 34, -2],
    ['West', 22, 8],
  ].map(([region, base, step]) => ({ quarter, region: region as string, revenue: (base as number) + (step as number) * q })),
);
