// Noisy x/y points around a line, grouped, for regression and dot examples
import { normal, rng } from './random.ts';

export interface Point {
  group: string;
  x: number;
  y: number;
}

/** Points along `y = intercept + slope * x` per group, with normal noise of spread `noise`. */
export function noisyLines(
  groups: Record<string, readonly [intercept: number, slope: number]>,
  n = 36,
  noise = 3,
  seed = 17,
): Point[] {
  const random = rng(seed);
  const jitter = normal(random, 0, noise);
  const rows: Point[] = [];
  for (const [group, [intercept, slope]] of Object.entries(groups)) {
    for (let i = 0; i < n; i++) {
      const x = Math.round((5 + random() * 45) * 10) / 10;
      rows.push({ group, x, y: Math.round((intercept + slope * x + jitter()) * 10) / 10 });
    }
  }
  return rows;
}
