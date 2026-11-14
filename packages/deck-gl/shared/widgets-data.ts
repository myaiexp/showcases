// Widgets chapter: timestamped trips between cities, and a slow promise of sample points
import { CITIES, pointCloud, seeded, type LngLat, type SamplePoint } from './data.ts';

export interface Trip {
  name: string;
  path: LngLat[];
  /** One timestamp per path vertex, 0..100 across the whole timeline. */
  timestamps: number[];
  color: [number, number, number];
}

/** Trips from London, Dubai and New York to nearby-ish cities, each with its own start time. */
export function trips(count = 40, seed = 3): Trip[] {
  const rand = seeded(seed);
  const hubs = ['London', 'Dubai', 'New York', 'Singapore', 'Tokyo'];
  const out: Trip[] = [];
  for (let i = 0; i < count; i++) {
    const from = CITIES.find((c) => c.name === hubs[i % hubs.length])!;
    const to = CITIES[Math.floor(rand() * CITIES.length)]!;
    if (to === from) continue;
    const steps = 24;
    const start = rand() * 45;
    const length = 30 + rand() * 25;
    const path: LngLat[] = [];
    const timestamps: number[] = [];
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      path.push([from.coordinates[0] + (to.coordinates[0] - from.coordinates[0]) * u, from.coordinates[1] + (to.coordinates[1] - from.coordinates[1]) * u + Math.sin(u * Math.PI) * 8]);
      timestamps.push(start + u * length);
    }
    out.push({ name: `${from.name} to ${to.name}`, path, timestamps, color: [90 + rand() * 165, 160 + rand() * 80, 255] });
  }
  return out;
}

/** Sample points that arrive after `ms`, like a slow request, with no network involved. */
export function slowPoints(ms: number, n = 2500, seed = 5): Promise<SamplePoint[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(pointCloud(n, { seed, spread: 2 })), ms);
  });
}
