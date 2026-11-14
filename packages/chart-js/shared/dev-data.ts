// Sample data for the Getting started guide: acquisitions, painting sizes
import { seeded } from './data.ts';

export interface Acquisition {
  year: number;
  count: number;
}

/** Artworks an imaginary museum acquired per year, with three standout years. */
export function acquisitionsByYear(): Acquisition[] {
  const rand = seeded(1964);
  const spikes: Record<number, number> = { 1964: 410, 1968: 520, 2008: 380 };
  return Array.from({ length: 57 }, (_, i) => {
    const year = 1960 + i;
    return { year, count: spikes[year] ?? Math.round(35 + rand() * 80 + (i > 40 ? 25 : 0)) };
  });
}

export interface Dimension {
  width: number;
  height: number;
  count: number;
}

/** How many paintings share each width and height (cm); some are square. */
export function paintingSizes(): Dimension[] {
  const rand = seeded(88);
  const out: Dimension[] = [];
  for (let i = 0; i < 70; i++) {
    const width = Math.round((20 + rand() * rand() * 380) / 5) * 5;
    const square = rand() < 0.2;
    const height = square ? width : Math.round((20 + rand() * rand() * 420) / 5) * 5;
    out.push({ width, height, count: Math.round(2 + rand() * rand() * 140) });
  }
  return out;
}

/** Chart.js bubble radius is in pixels, so the count is squeezed into a readable range. */
export const bubbleRadius = (count: number): number => 2 + Math.sqrt(count) * 0.8;

/** A bubble point for a size row. */
export function bubble(row: Dimension): { x: number; y: number; r: number } {
  return { x: row.width, y: row.height, r: bubbleRadius(row.count) };
}
