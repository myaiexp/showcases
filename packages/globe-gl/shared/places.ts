// Sample places: big cities with rough populations, and a seeded RNG

export interface City {
  name: string;
  lat: number;
  lng: number;
  /** Metro population, millions (rounded, for sizing marks only). */
  pop: number;
}

export const cities: City[] = [
  { name: 'Tokyo', lat: 35.68, lng: 139.69, pop: 37 },
  { name: 'Delhi', lat: 28.61, lng: 77.21, pop: 32 },
  { name: 'Shanghai', lat: 31.23, lng: 121.47, pop: 29 },
  { name: 'São Paulo', lat: -23.55, lng: -46.63, pop: 22 },
  { name: 'Mexico City', lat: 19.43, lng: -99.13, pop: 22 },
  { name: 'Cairo', lat: 30.04, lng: 31.24, pop: 21 },
  { name: 'Mumbai', lat: 19.08, lng: 72.88, pop: 21 },
  { name: 'Beijing', lat: 39.9, lng: 116.41, pop: 21 },
  { name: 'Dhaka', lat: 23.81, lng: 90.41, pop: 22 },
  { name: 'Osaka', lat: 34.69, lng: 135.5, pop: 19 },
  { name: 'New York', lat: 40.71, lng: -74.01, pop: 19 },
  { name: 'Karachi', lat: 24.86, lng: 67.01, pop: 17 },
  { name: 'Buenos Aires', lat: -34.6, lng: -58.38, pop: 15 },
  { name: 'Istanbul', lat: 41.01, lng: 28.98, pop: 15 },
  { name: 'Lagos', lat: 6.52, lng: 3.38, pop: 15 },
  { name: 'Manila', lat: 14.6, lng: 120.98, pop: 14 },
  { name: 'Rio de Janeiro', lat: -22.91, lng: -43.17, pop: 13 },
  { name: 'Los Angeles', lat: 34.05, lng: -118.24, pop: 12 },
  { name: 'Moscow', lat: 55.76, lng: 37.62, pop: 12 },
  { name: 'Kinshasa', lat: -4.44, lng: 15.27, pop: 15 },
  { name: 'Paris', lat: 48.86, lng: 2.35, pop: 11 },
  { name: 'Jakarta', lat: -6.21, lng: 106.85, pop: 11 },
  { name: 'Lima', lat: -12.05, lng: -77.04, pop: 11 },
  { name: 'Bangkok', lat: 13.76, lng: 100.5, pop: 11 },
  { name: 'Seoul', lat: 37.57, lng: 126.98, pop: 10 },
  { name: 'London', lat: 51.51, lng: -0.13, pop: 9.5 },
  { name: 'Tehran', lat: 35.69, lng: 51.39, pop: 9.5 },
  { name: 'Chicago', lat: 41.88, lng: -87.63, pop: 8.9 },
  { name: 'Bogotá', lat: 4.71, lng: -74.07, pop: 11 },
  { name: 'Johannesburg', lat: -26.2, lng: 28.05, pop: 6 },
  { name: 'Nairobi', lat: -1.29, lng: 36.82, pop: 5 },
  { name: 'Sydney', lat: -33.87, lng: 151.21, pop: 5.3 },
  { name: 'Singapore', lat: 1.35, lng: 103.82, pop: 6 },
  { name: 'Toronto', lat: 43.65, lng: -79.38, pop: 6.3 },
  { name: 'Madrid', lat: 40.42, lng: -3.7, pop: 6.7 },
  { name: 'Santiago', lat: -33.45, lng: -70.67, pop: 6.9 },
  { name: 'Riyadh', lat: 24.71, lng: 46.68, pop: 7.5 },
  { name: 'Berlin', lat: 52.52, lng: 13.4, pop: 3.6 },
  { name: 'Helsinki', lat: 60.17, lng: 24.94, pop: 1.3 },
  { name: 'Reykjavík', lat: 64.15, lng: -21.94, pop: 0.2 },
  { name: 'Anchorage', lat: 61.22, lng: -149.9, pop: 0.3 },
  { name: 'Honolulu', lat: 21.31, lng: -157.86, pop: 1 },
  { name: 'Auckland', lat: -36.85, lng: 174.76, pop: 1.7 },
  { name: 'Cape Town', lat: -33.92, lng: 18.42, pop: 4.8 },
  { name: 'Perth', lat: -31.95, lng: 115.86, pop: 2.1 },
  { name: 'Vancouver', lat: 49.28, lng: -123.12, pop: 2.6 },
];

/** Looks a city up by name. */
export function city(name: string): City {
  const c = cities.find((x) => x.name === name);
  if (!c) throw new Error(`No city named ${name}`);
  return c;
}

/** A seeded random number generator (mulberry32): the same data on every mount. */
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

/** A random spot spread evenly over the sphere (not bunched at the poles). */
export function randomSpot(rand: () => number): { lat: number; lng: number } {
  return { lat: (Math.asin(2 * rand() - 1) * 180) / Math.PI, lng: rand() * 360 - 180 };
}

/** A random spot within `spread` degrees of a centre, for clusters. */
export function near(rand: () => number, lat: number, lng: number, spread: number): { lat: number; lng: number } {
  const r = spread * Math.sqrt(-2 * Math.log(1 - rand() * 0.999)) * 0.5;
  const a = rand() * Math.PI * 2;
  return { lat: Math.max(-89, Math.min(89, lat + r * Math.sin(a))), lng: lng + (r * Math.cos(a)) / Math.max(0.2, Math.cos((lat * Math.PI) / 180)) };
}
