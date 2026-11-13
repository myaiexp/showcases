// Countries with a seeded synthetic numeric property, for the choropleth
import type { FeatureCollection } from 'geojson';
import { countries, seeded } from '../../shared/basemap.ts';

export const MAX = 100;

/** Every country gets `score` in 0..100. The numbers are invented, not real statistics. */
export function scored(): FeatureCollection {
  const rand = seeded(2024);
  return {
    ...countries,
    features: countries.features.map((f) => ({
      ...f,
      properties: { ...f.properties, score: Math.round(rand() * MAX) },
    })),
  };
}
