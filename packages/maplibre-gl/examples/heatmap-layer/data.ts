// Seeded weighted points clustered tightly around the shared cities
import type { Feature, FeatureCollection, Point } from 'geojson';
import { cities, seeded } from '../../shared/basemap.ts';

export function clusters(count = 900): FeatureCollection<Point> {
  const rand = seeded(21);
  const centres = Object.values(cities);
  const features: Feature<Point>[] = [];
  for (let i = 0; i < count; i++) {
    const [lng, lat] = centres[Math.floor(rand() * centres.length)] ?? [0, 0];
    const spread = rand() * rand() * 8;
    const angle = rand() * Math.PI * 2;
    features.push({
      type: 'Feature',
      properties: { weight: Math.round(rand() * 10) },
      geometry: {
        type: 'Point',
        coordinates: [lng + Math.cos(angle) * spread * 1.4, Math.max(-80, Math.min(80, lat + Math.sin(angle) * spread))],
      },
    });
  }
  return { type: 'FeatureCollection', features };
}
