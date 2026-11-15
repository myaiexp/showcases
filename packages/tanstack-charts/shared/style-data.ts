// Small inline datasets shared by the style, motion and legend examples
import { rng } from './random.ts';

export interface RevenueRow {
  id: string;
  month: string;
  revenue: number;
}

export const revenue: readonly RevenueRow[] = [
  { id: 'jan', month: 'Jan', revenue: 36_000 },
  { id: 'feb', month: 'Feb', revenue: 48_000 },
  { id: 'mar', month: 'Mar', revenue: 45_000 },
  { id: 'apr', month: 'Apr', revenue: 62_000 },
  { id: 'may', month: 'May', revenue: 76_000 },
  { id: 'jun', month: 'Jun', revenue: 71_000 },
];

export interface FeatureRow {
  id: string;
  feature: string;
  weeklyRequests: number;
}

export const features: readonly FeatureRow[] = [
  { id: 'f1', feature: 'Self-service account recovery', weeklyRequests: 128 },
  { id: 'f2', feature: 'Saved searches and alerting', weeklyRequests: 95 },
  { id: 'f3', feature: 'Audit log export', weeklyRequests: 72 },
  { id: 'f4', feature: 'Custom retention policies', weeklyRequests: 44 },
  { id: 'f5', feature: 'Role-based access controls', weeklyRequests: 31 },
];

export interface DownloadRow {
  id: string;
  week: string;
  package: string;
  downloads: number;
}

export const packageNames = ['core', 'react', 'octane'] as const;
export const packageColors = ['#2563eb', '#f97316', '#10b981'] as const;
const weeks = ['May 4', 'May 11', 'May 18', 'May 25', 'Jun 1', 'Jun 8'];

/** Weekly downloads for three packages, six weeks each. */
export const downloads: readonly DownloadRow[] = packageNames.flatMap((name, p) =>
  weeks.map((week, w) => ({ id: `${name}-${w}`, week, package: name, downloads: Math.round(900 - p * 260 + w * (140 - p * 30) + ((w * 37 + p * 53) % 70)) })),
);

export interface PointRow {
  id: string;
  x: number;
  y: number;
  value: number;
}

/** Scatter rows whose `value` field drives colour. */
export function scatter(seed = 5, n = 60): PointRow[] {
  const random = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const x = random() * 100;
    const y = 20 + x * 0.5 + (random() - 0.5) * 40;
    return { id: `p${i}`, x, y, value: Math.round(((x + y) / 1.5 + random() * 20) * 10) / 10 };
  });
}

/** Bar rows for `n` categories, new values for each `step`. */
export function barStep(step: number, n = 6): { id: string; label: string; value: number }[] {
  const random = rng(100 + step * 7);
  return Array.from({ length: n }, (_, i) => ({ id: `c${i}`, label: `Item ${i + 1}`, value: Math.round(20 + random() * 80) }));
}
