// Generates many seeded points in Gaussian clouds around the shared cities
import type { FeatureCollection, Point } from 'geojson';
import { cities, seeded } from '../../shared/basemap.ts';

/** `count` points, each with a small integer `weight`, spread around the 12 cities. */
export function generatePoints(count: number): FeatureCollection<Point> {
  const rand = seeded(42);
  const centres = Object.values(cities);
  const gauss = (): number => (rand() + rand() + rand() + rand() - 2) / 2;
  const features = new Array<FeatureCollection<Point>['features'][number]>(count);
  for (let i = 0; i < count; i++) {
    const [lng, lat] = centres[i % centres.length] ?? [0, 0];
    const spread = 1 + 4 * rand() * rand();
    features[i] = {
      type: 'Feature',
      properties: { weight: 1 + Math.floor(rand() * 5) },
      geometry: {
        type: 'Point',
        // Rounded to 4 decimals (about 10 m): the guide advises reducing coordinate precision.
        coordinates: [Math.round((lng + gauss() * spread * 2) * 1e4) / 1e4, Math.round((lat + gauss() * spread) * 1e4) / 1e4],
      },
    };
  }
  return { type: 'FeatureCollection', features };
}
