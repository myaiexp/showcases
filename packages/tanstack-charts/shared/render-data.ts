// Seeded datasets for the rendering, export and large-data examples
import { days, normal, rng, walk } from './random.ts';

export interface Revenue {
  month: string;
  revenue: number;
}

export const revenue: readonly Revenue[] = [
  { month: 'Jan', revenue: 42 },
  { month: 'Feb', revenue: 58 },
  { month: 'Mar', revenue: 76 },
  { month: 'Apr', revenue: 64 },
  { month: 'May', revenue: 81 },
  { month: 'Jun', revenue: 95 },
];

export interface Tick {
  id: string;
  date: Date;
  value: number;
}

/** An ordered signal of `n` samples, one per day, with a slow wave and noise. */
export function signal(n: number, seed = 7): Tick[] {
  const dates = days('2024-01-01', n);
  const w = walk(rng(seed), n, 50, 0.9);
  return dates.map((date, i) => ({ id: `t${i}`, date, value: w[i]! + 8 * Math.sin(i / 90) }));
}

export interface Pt {
  id: string;
  x: number;
  y: number;
}

/** `n` points scattered around three centres. */
export function cloud(n: number, seed = 3): Pt[] {
  const r = rng(seed);
  const g = normal(r);
  const centres = [
    [30, 40, 9, 6],
    [62, 58, 8, 10],
    [50, 20, 12, 5],
  ] as const;
  return Array.from({ length: n }, (_, i) => {
    const [cx, cy, sx, sy] = centres[Math.floor(r() * 3)]!;
    return { id: `p${i}`, x: cx + g() * sx, y: cy + g() * sy };
  });
}
