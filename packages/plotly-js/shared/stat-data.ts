// Seeded random numbers and the Apple price rows the statistical and financial examples share
import { csv, unpack, unpackNum } from './data.ts';

/** A seeded uniform generator in [0, 1): the docs call Math.random, examples need stable pictures. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard-normal draws from a uniform generator (Box-Muller, as the docs' density example does). */
export function gauss(rand: () => number): () => number {
  return () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

/** n uniform draws, each scaled and shifted: `uniform(rand, 500, 1, 0)` is Math.random() * 1 + 0. */
export function uniform(rand: () => number, n: number, scale = 1, shift = 0): number[] {
  return Array.from({ length: n }, () => rand() * scale + shift);
}

export interface Ohlc {
  x: string[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
}

/** The docs' finance-charts-apple.csv as OHLC columns, optionally cut to dates in [from, to] (ISO strings). */
export async function appleOhlc(from = '', to = '9999'): Promise<Ohlc> {
  const rows = await csv('finance-charts-apple.csv');
  const keep = rows.filter((r) => (r.Date ?? '') >= from && (r.Date ?? '') <= to);
  return {
    x: unpack(keep, 'Date'),
    open: unpackNum(keep, 'AAPL.Open'),
    high: unpackNum(keep, 'AAPL.High'),
    low: unpackNum(keep, 'AAPL.Low'),
    close: unpackNum(keep, 'AAPL.Close'),
  };
}
