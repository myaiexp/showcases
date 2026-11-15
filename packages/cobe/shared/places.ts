// Sample places as [lat, lon]: the cities the docs snippets use, and a few more
export type LatLon = [number, number];

export interface Place {
  key: string;
  name: string;
  location: LatLon;
}

/** The coordinates the docs' snippets give, plus a handful of other world cities. */
export const PLACES = {
  sf: { key: 'sf', name: 'San Francisco', location: [37.78, -122.44] },
  nyc: { key: 'nyc', name: 'New York', location: [40.71, -74.01] },
  london: { key: 'london', name: 'London', location: [51.51, -0.13] },
  paris: { key: 'paris', name: 'Paris', location: [48.86, 2.35] },
  tokyo: { key: 'tokyo', name: 'Tokyo', location: [35.68, 139.65] },
  sydney: { key: 'sydney', name: 'Sydney', location: [-33.87, 151.21] },
  singapore: { key: 'singapore', name: 'Singapore', location: [1.35, 103.82] },
  dubai: { key: 'dubai', name: 'Dubai', location: [25.2, 55.27] },
  saopaulo: { key: 'saopaulo', name: 'São Paulo', location: [-23.55, -46.63] },
  capetown: { key: 'capetown', name: 'Cape Town', location: [-33.92, 18.42] },
  mumbai: { key: 'mumbai', name: 'Mumbai', location: [19.08, 72.88] },
  helsinki: { key: 'helsinki', name: 'Helsinki', location: [60.17, 24.94] },
  mexico: { key: 'mexico', name: 'Mexico City', location: [19.43, -99.13] },
  lagos: { key: 'lagos', name: 'Lagos', location: [6.52, 3.38] },
  reykjavik: { key: 'reykjavik', name: 'Reykjavík', location: [64.15, -21.94] },
  auckland: { key: 'auckland', name: 'Auckland', location: [-36.85, 174.76] },
} satisfies Record<string, Place>;

export type PlaceKey = keyof typeof PLACES;

export const ALL_PLACES: readonly Place[] = Object.values(PLACES);

/** A repeatable pseudo-random number generator (mulberry32), for scattered sample points. */
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
