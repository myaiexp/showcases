// About 2000 seeded random points scattered around the shared cities
import type { Feature, FeatureCollection, Point } from 'geojson';
import { cities, seeded } from '../../shared/basemap.ts';

export function scatter(count = 2000): FeatureCollection<Point> {
  const rand = seeded(42);
  const list = Object.values(cities);
  const features: Feature<Point>[] = [];
  for (let i = 0; i < count; i++) {
    const [lng, lat] = list[Math.floor(rand() * list.length)] as [number, number];
    // Sum of two uniforms gives a soft cluster shape around each city.
    const dx = (rand() + rand() - 1) * 14;
    const dy = (rand() + rand() - 1) * 9;
    features.push({
      type: 'Feature',
      properties: { mag: 1 + Math.floor(rand() * 5) },
      geometry: { type: 'Point', coordinates: [lng + dx, Math.max(-80, Math.min(80, lat + dy))] },
    });
  }
  return { type: 'FeatureCollection', features };
}
