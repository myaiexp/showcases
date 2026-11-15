// Sample data made in code: seeded random, world cities, scattered points, routes
import type { Feature, FeatureCollection, LineString, Point } from 'geojson';

/** A small seeded PRNG (mulberry32), so every mount draws the same data. */
export function rng(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A normal deviate from a uniform source (Box–Muller). */
export function gauss(r: () => number): number {
  return Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
}

export interface City {
  name: string;
  lng: number;
  lat: number;
  /** Metro population, millions (rounded). */
  pop: number;
  continent: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania';
}

export const cities: City[] = [
  { name: 'Tokyo', lng: 139.69, lat: 35.69, pop: 37, continent: 'Asia' },
  { name: 'Delhi', lng: 77.21, lat: 28.61, pop: 32, continent: 'Asia' },
  { name: 'Shanghai', lng: 121.47, lat: 31.23, pop: 29, continent: 'Asia' },
  { name: 'São Paulo', lng: -46.63, lat: -23.55, pop: 22, continent: 'South America' },
  { name: 'Mexico City', lng: -99.13, lat: 19.43, pop: 22, continent: 'North America' },
  { name: 'Cairo', lng: 31.24, lat: 30.04, pop: 22, continent: 'Africa' },
  { name: 'Mumbai', lng: 72.88, lat: 19.08, pop: 21, continent: 'Asia' },
  { name: 'Beijing', lng: 116.41, lat: 39.9, pop: 21, continent: 'Asia' },
  { name: 'Dhaka', lng: 90.41, lat: 23.81, pop: 22, continent: 'Asia' },
  { name: 'Osaka', lng: 135.5, lat: 34.69, pop: 19, continent: 'Asia' },
  { name: 'New York', lng: -74.01, lat: 40.71, pop: 19, continent: 'North America' },
  { name: 'Karachi', lng: 67.01, lat: 24.86, pop: 17, continent: 'Asia' },
  { name: 'Buenos Aires', lng: -58.38, lat: -34.6, pop: 15, continent: 'South America' },
  { name: 'Istanbul', lng: 28.98, lat: 41.01, pop: 15, continent: 'Europe' },
  { name: 'Kolkata', lng: 88.36, lat: 22.57, pop: 15, continent: 'Asia' },
  { name: 'Lagos', lng: 3.38, lat: 6.52, pop: 15, continent: 'Africa' },
  { name: 'Manila', lng: 120.98, lat: 14.6, pop: 14, continent: 'Asia' },
  { name: 'Rio de Janeiro', lng: -43.17, lat: -22.91, pop: 13, continent: 'South America' },
  { name: 'Guangzhou', lng: 113.26, lat: 23.13, pop: 14, continent: 'Asia' },
  { name: 'Los Angeles', lng: -118.24, lat: 34.05, pop: 12, continent: 'North America' },
  { name: 'Moscow', lng: 37.62, lat: 55.76, pop: 12, continent: 'Europe' },
  { name: 'Kinshasa', lng: 15.27, lat: -4.44, pop: 15, continent: 'Africa' },
  { name: 'Paris', lng: 2.35, lat: 48.86, pop: 11, continent: 'Europe' },
  { name: 'Jakarta', lng: 106.85, lat: -6.21, pop: 11, continent: 'Asia' },
  { name: 'Lima', lng: -77.04, lat: -12.05, pop: 11, continent: 'South America' },
  { name: 'Bangkok', lng: 100.5, lat: 13.76, pop: 11, continent: 'Asia' },
  { name: 'Seoul', lng: 126.98, lat: 37.57, pop: 10, continent: 'Asia' },
  { name: 'London', lng: -0.13, lat: 51.51, pop: 9, continent: 'Europe' },
  { name: 'Tehran', lng: 51.39, lat: 35.69, pop: 9, continent: 'Asia' },
  { name: 'Chicago', lng: -87.63, lat: 41.88, pop: 9, continent: 'North America' },
  { name: 'Bogotá', lng: -74.07, lat: 4.71, pop: 11, continent: 'South America' },
  { name: 'Johannesburg', lng: 28.05, lat: -26.2, pop: 6, continent: 'Africa' },
  { name: 'Nairobi', lng: 36.82, lat: -1.29, pop: 5, continent: 'Africa' },
  { name: 'Sydney', lng: 151.21, lat: -33.87, pop: 5, continent: 'Oceania' },
  { name: 'Melbourne', lng: 144.96, lat: -37.81, pop: 5, continent: 'Oceania' },
  { name: 'Toronto', lng: -79.38, lat: 43.65, pop: 6, continent: 'North America' },
  { name: 'Madrid', lng: -3.7, lat: 40.42, pop: 7, continent: 'Europe' },
  { name: 'Berlin', lng: 13.4, lat: 52.52, pop: 4, continent: 'Europe' },
  { name: 'Singapore', lng: 103.82, lat: 1.35, pop: 6, continent: 'Asia' },
  { name: 'Dubai', lng: 55.27, lat: 25.2, pop: 3, continent: 'Asia' },
  { name: 'Helsinki', lng: 24.94, lat: 60.17, pop: 1, continent: 'Europe' },
  { name: 'Auckland', lng: 174.76, lat: -36.85, pop: 2, continent: 'Oceania' },
  { name: 'Santiago', lng: -70.67, lat: -33.45, pop: 7, continent: 'South America' },
  { name: 'Vancouver', lng: -123.12, lat: 49.28, pop: 3, continent: 'North America' },
  { name: 'Cape Town', lng: 18.42, lat: -33.92, pop: 5, continent: 'Africa' },
];

export const CONTINENTS = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'] as const;

/** The cities as a GeoJSON point collection, every City field in `properties`. */
export function cityFeatures(list: readonly City[] = cities): FeatureCollection<Point, City> {
  return {
    type: 'FeatureCollection',
    features: list.map(
      (c): Feature<Point, City> => ({ type: 'Feature', properties: c, geometry: { type: 'Point', coordinates: [c.lng, c.lat] } }),
    ),
  };
}

export interface Sample {
  lng: number;
  lat: number;
  /** 0..100, larger near the cluster centres. */
  value: number;
  /** The cluster (a city) the point was scattered around. */
  city: string;
}

/** n points scattered around the given cities (spread in degrees), as a JSON array. */
export function scatter(n: number, opts: { seed?: number; spread?: number; around?: readonly City[] } = {}): Sample[] {
  const r = rng(opts.seed ?? 7);
  const around = opts.around ?? cities;
  const spread = opts.spread ?? 2.5;
  const out: Sample[] = [];
  for (let i = 0; i < n; i++) {
    const c = around[Math.floor(r() * around.length)] ?? cities[0]!;
    const dx = gauss(r) * spread;
    const dy = gauss(r) * spread * 0.7;
    const d = Math.hypot(dx, dy) / spread;
    out.push({ lng: c.lng + dx, lat: c.lat + dy, value: Math.round(100 * Math.exp(-d * d * 0.8) * (0.6 + 0.4 * r())), city: c.name });
  }
  return out;
}

export interface Route {
  from: string;
  to: string;
  lng1: number;
  lat1: number;
  lng2: number;
  lat2: number;
  /** Flights a week (made up), 10..100. */
  count: number;
}

/** Routes from one hub to each of the other cities, as a JSON array with lng1/lat1/lng2/lat2. */
export function routesFrom(hub: string, list: readonly City[] = cities, seed = 3): Route[] {
  const r = rng(seed);
  const h = list.find((c) => c.name === hub) ?? list[0]!;
  return list
    .filter((c) => c !== h)
    .map((c) => ({ from: h.name, to: c.name, lng1: h.lng, lat1: h.lat, lng2: c.lng, lat2: c.lat, count: Math.round(10 + 90 * r()) }));
}

/** The same routes as GeoJSON LineStrings (two vertices each). */
export function routeFeatures(routes: readonly Route[]): FeatureCollection<LineString, Route> {
  return {
    type: 'FeatureCollection',
    features: routes.map((rt) => ({
      type: 'Feature',
      properties: rt,
      geometry: { type: 'LineString', coordinates: [[rt.lng1, rt.lat1], [rt.lng2, rt.lat2]] },
    })),
  };
}
