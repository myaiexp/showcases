// Generated routes between the shared cities, as GeoJSON line features
import type { Feature, FeatureCollection, LineString } from 'geojson';
import { cities } from '../../shared/basemap.ts';

type Pos = [number, number];

/** A gently bowed line from a to b (a quadratic curve through a lifted midpoint). */
function curve(a: Pos, b: Pos, bulge: number, n = 40): Pos[] {
  const mid: Pos = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + bulge];
  const pts: Pos[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([
      (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * mid[0] + t * t * b[0],
      (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * mid[1] + t * t * b[1],
    ]);
  }
  return pts;
}

function route(name: string, coordinates: Pos[]): Feature<LineString> {
  return { type: 'Feature', properties: { name }, geometry: { type: 'LineString', coordinates } };
}

/** The route that gets a gradient; it lives in its own source because that needs lineMetrics. */
export const gradientRoutes: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [route('london-newyork', curve(cities.london, cities.newYork, 14))],
};

/** Dashed, zoom-width, offset and join/cap demonstration routes. */
export const plainRoutes: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [
    route('dashed', curve(cities.helsinki, cities.cairo, -8)),
    route('zoom', curve(cities.tokyo, cities.singapore, 10)),
    route('offset', curve(cities.saoPaulo, cities.capeTown, -10)),
    route('zigzag', [[60, -20], [70, -8], [80, -22], [90, -8], [100, -22], [110, -8]]),
  ],
};
