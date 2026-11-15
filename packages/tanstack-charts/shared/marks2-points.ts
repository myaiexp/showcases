// Seeded car and penguin style point clouds for the spatial mark examples
import { normal, rng } from './random.ts';

export interface Car {
  id: number;
  weight: number;
  economy: number;
  cylinders: 4 | 6 | 8;
}

/** `n` cars: heavier cars with more cylinders get fewer miles per gallon. */
export function cars(n = 120, seed = 5): Car[] {
  const random = rng(seed);
  const noise = normal(random, 0, 2.2);
  const rows: Car[] = [];
  for (let id = 0; id < n; id++) {
    const r = random();
    const cylinders = r < 0.5 ? 4 : r < 0.8 ? 6 : 8;
    const base = cylinders === 4 ? 2300 : cylinders === 6 ? 3200 : 4200;
    const weight = Math.round(base + (random() - 0.5) * 900);
    const economy = Math.round((46 - weight / 125 + noise()) * 10) / 10;
    rows.push({ id, weight, economy: Math.max(8, economy), cylinders });
  }
  return rows;
}

export interface Penguin {
  id: number;
  species: 'Adelie' | 'Chinstrap' | 'Gentoo';
  billLength: number;
  billDepth: number;
}

const centers = {
  Adelie: [38.8, 18.3],
  Chinstrap: [48.8, 18.4],
  Gentoo: [47.5, 15],
} as const;

/** `n` penguins per species around three bill-size centers. */
export function penguins(n = 60, seed = 11): Penguin[] {
  const random = rng(seed);
  const length = normal(random, 0, 2.6);
  const depth = normal(random, 0, 1);
  const rows: Penguin[] = [];
  let id = 0;
  for (const species of Object.keys(centers) as (keyof typeof centers)[]) {
    const [cx, cy] = centers[species];
    for (let i = 0; i < n; i++) {
      rows.push({ id: id++, species, billLength: Math.round((cx + length()) * 10) / 10, billDepth: Math.round((cy + depth()) * 10) / 10 });
    }
  }
  return rows;
}
