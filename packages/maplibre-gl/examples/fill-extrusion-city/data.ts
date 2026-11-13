// A generated block grid of footprints with podium and tower parts
import type { Feature, FeatureCollection, Polygon } from 'geojson';
import { cities, seeded } from '../../shared/basemap.ts';

export const CITY = cities.helsinki;

function box(lng: number, lat: number, w: number, h: number): Polygon {
  return {
    type: 'Polygon',
    coordinates: [[[lng, lat], [lng + w, lat], [lng + w, lat + h], [lng, lat + h], [lng, lat]]],
  };
}

export function blocks(n = 14): FeatureCollection<Polygon> {
  const rand = seeded(99);
  const dLat = 0.0011;
  const dLng = dLat / Math.cos((CITY[1] * Math.PI) / 180);
  const features: Feature<Polygon>[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const lng = CITY[0] + (i - n / 2) * dLng;
      const lat = CITY[1] + (j - n / 2) * dLat;
      // Taller towards the middle of the grid.
      const centre = 1 - Math.hypot(i - n / 2, j - n / 2) / n;
      const podium = 8 + Math.round(rand() * 14);
      features.push({
        type: 'Feature',
        properties: { height: podium, base: 0, part: 'podium' },
        geometry: box(lng, lat, dLng * 0.8, dLat * 0.8),
      });
      if (rand() < centre + 0.1) {
        const tower = podium + 15 + Math.round(rand() * 110 * centre);
        features.push({
          type: 'Feature',
          properties: { height: tower, base: podium, part: 'tower' },
          geometry: box(lng + dLng * 0.2, lat + dLat * 0.2, dLng * 0.4, dLat * 0.4),
        });
      }
    }
  }
  return { type: 'FeatureCollection', features };
}
