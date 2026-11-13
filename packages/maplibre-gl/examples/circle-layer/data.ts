// Seeded point dataset: scattered "stations" around the shared cities
import type { Feature, FeatureCollection, Point } from 'geojson';
import { cities, seeded } from '../../shared/basemap.ts';

export const kinds = ['quake', 'storm', 'flood'] as const;

export function stations(count = 360): FeatureCollection<Point> {
  const rand = seeded(7);
  const centres = Object.values(cities);
  const features: Feature<Point>[] = [];
  for (let i = 0; i < count; i++) {
    const [lng, lat] = centres[Math.floor(rand() * centres.length)] ?? [0, 0];
    // Sum of two uniforms gives a soft cluster around the city.
    const dx = (rand() + rand() - 1) * 14;
    const dy = (rand() + rand() - 1) * 9;
    features.push({
      type: 'Feature',
      properties: { mag: Math.round((1 + rand() * rand() * 9) * 10) / 10, kind: kinds[Math.floor(rand() * 3)] },
      geometry: { type: 'Point', coordinates: [lng + dx, Math.max(-80, Math.min(80, lat + dy))] },
    });
  }
  return { type: 'FeatureCollection', features };
}
