// Heatmap sample data made in code: quake-like points as JSON, CSV, GeoJSON, ramps
import type { Feature, FeatureCollection, Point } from 'geojson';
import { gauss, rng } from './data.ts';

/** Row shape of the docs' earthquake JSON: lng, lat, mag (a weight), plus v for aggregation. */
export interface Quake {
  lng: number;
  lat: number;
  /** 0..5, the weight field the docs map with size('mag', [0, 1]). */
  mag: number;
  /** 1..100, the field the grid and hexagon transforms aggregate. */
  v: number;
}

// Hubs the points cluster around (lng, lat): roughly a dozen and a half European cities.
const HUBS: [number, number][] = [
  [2.35, 48.86], [-0.13, 51.51], [13.4, 52.52], [-3.7, 40.42], [12.5, 41.9], [16.37, 48.21], [21, 52.23], [4.9, 52.37],
  [10.75, 59.9], [18.07, 59.33], [24.94, 60.17], [23.7, 37.98], [19.04, 47.5], [14.42, 50.08], [9.19, 45.46], [-9.14, 38.72],
];

/** n points clustered around European cities, a fifth of them spread evenly (stands in for the docs' heat-map JSON/CSV). */
export function quakes(n: number, opts: { seed?: number; spread?: number } = {}): Quake[] {
  const r = rng(opts.seed ?? 4);
  const spread = opts.spread ?? 1.1;
  const out: Quake[] = [];
  for (let i = 0; i < n; i++) {
    let lng: number;
    let lat: number;
    let strength: number;
    if (r() < 0.2) {
      lng = -8 + r() * 34;
      lat = 38 + r() * 22;
      strength = 0.15 + 0.2 * r();
    } else {
      const hub = HUBS[Math.floor(r() * HUBS.length)] ?? [0, 0];
      const dx = gauss(r) * spread;
      const dy = gauss(r) * spread * 0.7;
      lng = hub[0] + dx;
      lat = hub[1] + dy;
      strength = Math.exp(-0.4 * (dx * dx + dy * dy) / (spread * spread)) * (0.5 + 0.5 * r());
    }
    const v = Math.max(1, Math.round(100 * strength));
    out.push({ lng: Math.round(lng * 1e4) / 1e4, lat: Math.round(lat * 1e4) / 1e4, mag: Math.round((v / 20) * 10) / 10, v });
  }
  return out;
}

/** The same rows as CSV text with a lng,lat,mag,v header. */
export function csvOf(list: readonly Quake[]): string {
  return ['lng,lat,mag,v', ...list.map((q) => `${q.lng},${q.lat},${q.mag},${q.v}`)].join('\n');
}

/** The same rows as a GeoJSON FeatureCollection of points. */
export function geojsonOf(list: readonly Quake[]): FeatureCollection<Point, Quake> {
  return {
    type: 'FeatureCollection',
    features: list.map((q): Feature<Point, Quake> => ({ type: 'Feature', properties: q, geometry: { type: 'Point', coordinates: [q.lng, q.lat] } })),
  };
}

export const XY = { parser: { type: 'json', x: 'lng', y: 'lat' } } as const;
export const CSV_XY = { parser: { type: 'csv', x: 'lng', y: 'lat' } } as const;

/** The camera over the points. */
export const HEAT_VIEW = { center: [10, 48] as [number, number], zoom: 3.5, cardZoom: 2.5 };

/** The docs' classic ramp (their order reversed, as the tutorial does). */
export const RAMP = {
  colors: ['#FF4818', '#F7B74A', '#FFF598', '#91EABC', '#2EA9A1', '#206C7C'].reverse(),
  positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
};

/** The tutorial's teal palette for aggregated cells. */
export const TEAL = ['#094D4A', '#146968', '#1D7F7E', '#289899', '#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#C3F9CC', '#DEFAC0', '#ECFFB1'];

/** The grid tutorial's blue-to-mint palette. */
export const BLUES = ['#0B0030', '#100243', '#1B048B', '#051FB7', '#0350C1', '#0072C4', '#0796D3', '#2BA9DF', '#30C7C4', '#6BD5A0', '#A7ECB2', '#D0F4CA'];
