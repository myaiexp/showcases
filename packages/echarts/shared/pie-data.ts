// Sample data shared by the pie and funnel examples: traffic sources, regions and funnel stages
export interface Slice { name: string; value: number }

/** Five traffic sources, the usual pie sample. */
export const SOURCES: Slice[] = [
  { name: 'Search Engine', value: 1048 },
  { name: 'Direct', value: 735 },
  { name: 'Email', value: 580 },
  { name: 'Union Ads', value: 484 },
  { name: 'Video Ads', value: 300 },
];

/** Eight uneven slices, two of them tiny, for angle and label-overlap examples. */
export const UNEVEN: Slice[] = [
  { name: 'Chrome', value: 640 },
  { name: 'Safari', value: 310 },
  { name: 'Edge', value: 150 },
  { name: 'Firefox', value: 90 },
  { name: 'Samsung', value: 34 },
  { name: 'Opera', value: 21 },
  { name: 'Brave', value: 9 },
  { name: 'Other', value: 4 },
];

/** Deterministic pseudo-random numbers (seeded), so reloads show the same data. */
export function rng(seed: number): () => number {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Funnel stages with the planned (expected) and the achieved (actual) count. */
export const STAGES = [
  { name: 'Visits', expected: 100, actual: 100 },
  { name: 'Signups', expected: 80, actual: 62 },
  { name: 'Trials', expected: 60, actual: 41 },
  { name: 'Purchases', expected: 40, actual: 22 },
  { name: 'Renewals', expected: 25, actual: 9 },
];
