// Seeded datasets for the Bar, Line, Area, Scatter, Heatmap and BoxPlot chapters
import { seeded, type Datum } from './concepts-data.ts';

export { seeded };
export type { Datum };

export const REGIONS = ['North', 'South', 'East', 'West'];
export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
export const HOURS = ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** One row per category and group: { cat, group, value }. */
export function grouped(rand: () => number, cats: readonly string[] = QUARTERS, groups: readonly string[] = REGIONS, lo = 10, hi = 60): Datum[] {
  return groups.flatMap((group) => cats.map((cat) => ({ cat, group, value: Math.round(lo + rand() * (hi - lo)) })));
}

/** One row per label and group, each group a random walk: { x, group, value }. */
export function trends(rand: () => number, labels: readonly string[] = HOURS, groups: readonly string[] = ['A', 'B', 'C'], lo = 10, hi = 90): Datum[] {
  return groups.flatMap((group, g) => {
    let v = lo + ((hi - lo) * (g + 1)) / (groups.length + 1);
    return labels.map((x) => {
      v = Math.min(hi, Math.max(lo, v + (rand() - 0.5) * (hi - lo) * 0.3));
      return { x, group, value: Math.round(v) };
    });
  });
}

/** Box plot rows: { x, group, min, q1, median, q3, max, outliers }. */
export function boxRows(rand: () => number, cats: readonly string[], groups: readonly string[] = ['']): Record<string, unknown>[] {
  return cats.flatMap((x, i) =>
    groups.map((group, g) => {
      const base = 20 + i * 6 + g * 8 + rand() * 10;
      const q1 = base + rand() * 4;
      const median = q1 + 3 + rand() * 5;
      const q3 = median + 3 + rand() * 6;
      const min = q1 - 4 - rand() * 6;
      const max = q3 + 4 + rand() * 6;
      const r = (n: number): number => Math.round(n * 10) / 10;
      return {
        x,
        group,
        min: r(min),
        q1: r(q1),
        median: r(median),
        q3: r(q3),
        max: r(max),
        outliers: [r(min - 3 - rand() * 4), r(max + 2 + rand() * 6)],
      };
    }),
  );
}

/** Scatter points with a size and a category: { x, y, size, kind }. */
export function bubbles(rand: () => number, n = 36, kinds: readonly string[] = ['Phones', 'Laptops', 'Tablets']): Datum[] {
  return Array.from({ length: n }, (_, i) => ({
    x: Math.round(rand() * 100),
    y: Math.round(rand() * 100),
    size: Math.round(10 + rand() * 90),
    kind: kinds[i % kinds.length],
  }));
}

/** A bell-shaped sample (sum of uniforms) around `center`, `n` values. */
export function sample(rand: () => number, n: number, center = 50, spread = 20): number[] {
  return Array.from({ length: n }, () => {
    const s = rand() + rand() + rand() + rand() - 2;
    return Math.round((center + s * spread * 1.2) * 10) / 10;
  });
}

/** Counts a sample into equal-width bins: { x0, x1, frequency }. */
export function binCounts(values: readonly number[], lo: number, hi: number, width: number): Record<string, number>[] {
  const bins: Record<string, number>[] = [];
  for (let x0 = lo; x0 < hi; x0 += width) bins.push({ x0, x1: x0 + width, frequency: 0 });
  for (const v of values) {
    const bin = bins[Math.min(bins.length - 1, Math.max(0, Math.floor((v - lo) / width)))];
    if (bin) bin.frequency = (bin.frequency ?? 0) + 1;
  }
  return bins;
}

/** A symmetric matrix of correlations as heatmap cells: { var1, var2, value }. */
export function correlations(rand: () => number, names: readonly string[]): Record<string, unknown>[] {
  const m: number[][] = names.map(() => names.map(() => 1));
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      const v = Math.round((rand() * 2 - 1) * 100) / 100;
      (m[i] as number[])[j] = v;
      (m[j] as number[])[i] = v;
    }
  }
  return names.flatMap((var1, i) => names.map((var2, j) => ({ var1, var2, value: (m[i] as number[])[j] })));
}
