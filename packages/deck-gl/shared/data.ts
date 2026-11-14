// Seeded sample data: world cities, point clouds around a centre, flight routes
export type LngLat = [number, number];

/** Deterministic PRNG (mulberry32), so a card looks the same on every load. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal sample from a uniform PRNG (Box-Muller). */
export function gaussian(rand: () => number): number {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export interface City {
  name: string;
  country: string;
  coordinates: LngLat;
  /** Metro population, millions (rounded). */
  population: number;
}

export const CITIES: readonly City[] = [
  { name: 'Tokyo', country: 'Japan', coordinates: [139.69, 35.69], population: 37 },
  { name: 'Delhi', country: 'India', coordinates: [77.21, 28.61], population: 32 },
  { name: 'Shanghai', country: 'China', coordinates: [121.47, 31.23], population: 29 },
  { name: 'São Paulo', country: 'Brazil', coordinates: [-46.63, -23.55], population: 22 },
  { name: 'Mexico City', country: 'Mexico', coordinates: [-99.13, 19.43], population: 22 },
  { name: 'Cairo', country: 'Egypt', coordinates: [31.24, 30.04], population: 22 },
  { name: 'Mumbai', country: 'India', coordinates: [72.88, 19.08], population: 21 },
  { name: 'Beijing', country: 'China', coordinates: [116.41, 39.9], population: 21 },
  { name: 'Dhaka', country: 'Bangladesh', coordinates: [90.41, 23.81], population: 23 },
  { name: 'Osaka', country: 'Japan', coordinates: [135.5, 34.69], population: 19 },
  { name: 'New York', country: 'United States', coordinates: [-74.01, 40.71], population: 19 },
  { name: 'Karachi', country: 'Pakistan', coordinates: [67.01, 24.86], population: 17 },
  { name: 'Buenos Aires', country: 'Argentina', coordinates: [-58.38, -34.6], population: 15 },
  { name: 'Istanbul', country: 'Turkey', coordinates: [28.98, 41.01], population: 16 },
  { name: 'Kolkata', country: 'India', coordinates: [88.36, 22.57], population: 15 },
  { name: 'Lagos', country: 'Nigeria', coordinates: [3.38, 6.52], population: 15 },
  { name: 'Manila', country: 'Philippines', coordinates: [120.98, 14.6], population: 14 },
  { name: 'Rio de Janeiro', country: 'Brazil', coordinates: [-43.17, -22.91], population: 14 },
  { name: 'Los Angeles', country: 'United States', coordinates: [-118.24, 34.05], population: 12 },
  { name: 'Moscow', country: 'Russia', coordinates: [37.62, 55.76], population: 12 },
  { name: 'Paris', country: 'France', coordinates: [2.35, 48.86], population: 11 },
  { name: 'Jakarta', country: 'Indonesia', coordinates: [106.85, -6.21], population: 11 },
  { name: 'Lima', country: 'Peru', coordinates: [-77.04, -12.05], population: 11 },
  { name: 'Bangkok', country: 'Thailand', coordinates: [100.5, 13.76], population: 11 },
  { name: 'Seoul', country: 'South Korea', coordinates: [126.98, 37.57], population: 10 },
  { name: 'London', country: 'United Kingdom', coordinates: [-0.13, 51.51], population: 9 },
  { name: 'Chicago', country: 'United States', coordinates: [-87.63, 41.88], population: 9 },
  { name: 'Johannesburg', country: 'South Africa', coordinates: [28.05, -26.2], population: 6 },
  { name: 'Nairobi', country: 'Kenya', coordinates: [36.82, -1.29], population: 5 },
  { name: 'Sydney', country: 'Australia', coordinates: [151.21, -33.87], population: 5 },
  { name: 'Singapore', country: 'Singapore', coordinates: [103.82, 1.35], population: 6 },
  { name: 'Toronto', country: 'Canada', coordinates: [-79.38, 43.65], population: 6 },
  { name: 'Madrid', country: 'Spain', coordinates: [-3.7, 40.42], population: 7 },
  { name: 'Berlin', country: 'Germany', coordinates: [13.4, 52.52], population: 4 },
  { name: 'Dubai', country: 'United Arab Emirates', coordinates: [55.27, 25.2], population: 3 },
  { name: 'Santiago', country: 'Chile', coordinates: [-70.67, -33.45], population: 7 },
  { name: 'Bogotá', country: 'Colombia', coordinates: [-74.07, 4.71], population: 11 },
  { name: 'Kinshasa', country: 'DR Congo', coordinates: [15.27, -4.44], population: 17 },
  { name: 'Helsinki', country: 'Finland', coordinates: [24.94, 60.17], population: 1 },
  { name: 'Reykjavík', country: 'Iceland', coordinates: [-21.94, 64.15], population: 0.2 },
  { name: 'Auckland', country: 'New Zealand', coordinates: [174.76, -36.85], population: 2 },
  { name: 'Anchorage', country: 'United States', coordinates: [-149.9, 61.22], population: 0.3 },
  { name: 'Honolulu', country: 'United States', coordinates: [-157.86, 21.31], population: 1 },
  { name: 'Perth', country: 'Australia', coordinates: [115.86, -31.95], population: 2 },
  { name: 'Cape Town', country: 'South Africa', coordinates: [18.42, -33.92], population: 5 },
];

/** Looks up a city in CITIES by name; throws on a typo so a bad name fails loudly. */
export function city(name: string): City {
  const c = CITIES.find((x) => x.name === name);
  if (!c) throw new Error(`no city named ${name}`);
  return c;
}

export interface SamplePoint {
  position: LngLat;
  /** 0..1, for colour or size. */
  value: number;
  /** Index of the cluster the point came from. */
  cluster: number;
}

/**
 * `n` points in Gaussian clouds around `centres`, `spread` degrees wide (one standard
 * deviation). The default centres are a few European capitals, so a zoom ~4 view fits them.
 */
export function pointCloud(
  n: number,
  { seed = 1, spread = 1.2, centres = [[2.35, 48.86], [13.4, 52.52], [-3.7, 40.42], [12.5, 41.9]] as LngLat[] } = {},
): SamplePoint[] {
  const rand = seeded(seed);
  const out: SamplePoint[] = [];
  for (let i = 0; i < n; i++) {
    const cluster = Math.floor(rand() * centres.length);
    const [lng, lat] = centres[cluster]!;
    const dx = gaussian(rand) * spread;
    const dy = gaussian(rand) * spread * 0.7;
    out.push({ position: [lng + dx, lat + dy], value: Math.min(1, Math.hypot(dx, dy) / (spread * 2.5)), cluster });
  }
  return out;
}

export interface Route {
  from: City;
  to: City;
  /** Seeded weekly flights, for widths and colours. */
  flights: number;
}

/** Routes from each hub to every other city in CITIES. */
export function routes(hubs: readonly string[] = ['London', 'Dubai', 'New York'], seed = 7): Route[] {
  const rand = seeded(seed);
  const out: Route[] = [];
  for (const h of hubs) {
    const from = city(h);
    for (const to of CITIES) if (to !== from) out.push({ from, to, flights: Math.round(5 + rand() * 60) });
  }
  return out;
}
