// Seeded random numbers, point clouds and a city list shared by the scatter/heatmap examples
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Approximately normal random number (sum of four uniforms), mean 0, spread about ±1. */
export function gauss(r: () => number): number {
  return (r() + r() + r() + r() - 2) * 1.2;
}

/** `n` points of [x, y] in three overlapping gaussian blobs; `shift` moves the blobs. */
export function blobs(n: number, seed: number, shift = 0): number[][] {
  const r = rng(seed);
  const centres = [
    [30 + shift, 35],
    [62, 60 - shift],
    [75 - shift, 28 + shift],
  ] as const;
  return Array.from({ length: n }, (_, i) => {
    const [cx, cy] = centres[i % 3]!;
    return [+(cx + gauss(r) * 11).toFixed(2), +(cy + gauss(r) * 11).toFixed(2)];
  });
}

export interface City {
  name: string;
  lon: number;
  lat: number;
  /** Metro population in millions, roughly. */
  pop: number;
}

export const CITIES: City[] = [
  { name: 'Tokyo', lon: 139.7, lat: 35.7, pop: 37 },
  { name: 'Delhi', lon: 77.2, lat: 28.6, pop: 32 },
  { name: 'Shanghai', lon: 121.5, lat: 31.2, pop: 29 },
  { name: 'Sao Paulo', lon: -46.6, lat: -23.5, pop: 22 },
  { name: 'Mexico City', lon: -99.1, lat: 19.4, pop: 22 },
  { name: 'Cairo', lon: 31.2, lat: 30.0, pop: 22 },
  { name: 'New York', lon: -74.0, lat: 40.7, pop: 19 },
  { name: 'Lagos', lon: 3.4, lat: 6.5, pop: 16 },
  { name: 'Istanbul', lon: 29.0, lat: 41.0, pop: 15 },
  { name: 'Moscow', lon: 37.6, lat: 55.8, pop: 12 },
  { name: 'London', lon: -0.1, lat: 51.5, pop: 9 },
  { name: 'Los Angeles', lon: -118.2, lat: 34.1, pop: 13 },
  { name: 'Jakarta', lon: 106.8, lat: -6.2, pop: 11 },
  { name: 'Sydney', lon: 151.2, lat: -33.9, pop: 5 },
  { name: 'Nairobi', lon: 36.8, lat: -1.3, pop: 5 },
  { name: 'Buenos Aires', lon: -58.4, lat: -34.6, pop: 15 },
  { name: 'Paris', lon: 2.35, lat: 48.9, pop: 11 },
  { name: 'Johannesburg', lon: 28.0, lat: -26.2, pop: 6 },
  { name: 'Bangkok', lon: 100.5, lat: 13.8, pop: 11 },
  { name: 'Toronto', lon: -79.4, lat: 43.7, pop: 6 },
  { name: 'Lima', lon: -77.0, lat: -12.0, pop: 11 },
  { name: 'Seoul', lon: 127.0, lat: 37.6, pop: 10 },
  { name: 'Dubai', lon: 55.3, lat: 25.2, pop: 3 },
  { name: 'Helsinki', lon: 24.9, lat: 60.2, pop: 1.5 },
];
