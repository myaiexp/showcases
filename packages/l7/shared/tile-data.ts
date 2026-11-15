// Vector tile sources made in code: countries, borders and scattered towns as named tile layers
import type { Feature, FeatureCollection, LineString, MultiLineString, Point, Polygon } from 'geojson';
import { gauss, rng } from './data.ts';
import { EUROPE } from './line-data.ts';
import { borders, countries } from './world.ts';

export interface TownProps {
  name: string;
  id: number;
  /** 1..100: a population-like number, for sizes and colours. */
  pop: number;
}

/** n towns scattered around the European cities, with name, id and pop. */
export function towns(n = 160, seed = 4): FeatureCollection<Point, TownProps> {
  const r = rng(seed);
  const features = Array.from({ length: n }, (_, i): Feature<Point, TownProps> => {
    const c = EUROPE[Math.floor(r() * EUROPE.length)] ?? EUROPE[0]!;
    return {
      type: 'Feature',
      properties: { name: `Town ${i + 1}`, id: i + 1, pop: Math.round(1 + 99 * r()) },
      geometry: { type: 'Point', coordinates: [c.lng + gauss(r) * 3, c.lat + gauss(r) * 2.2] },
    };
  });
  return { type: 'FeatureCollection', features };
}

/** The shared borders as plain LineString features (one per segment), with an id. */
export const borderLines: FeatureCollection<LineString, { id: number }> = {
  type: 'FeatureCollection',
  features: (borders as MultiLineString).coordinates.map((c, i) => ({
    type: 'Feature',
    properties: { id: i + 1 },
    geometry: { type: 'LineString', coordinates: c },
  })),
};

/** The named layers every vector tile example cuts its tiles from (the `sourceLayer` names). */
export const tileLayers = {
  countries: countries as FeatureCollection<Polygon | import('geojson').MultiPolygon, { name: string; id: number }>,
  borders: borderLines,
  towns: towns(),
};

/** Five fills for ids, as a colour callback: a field mapped per tile would rescale in every tile. */
export const PALETTE = ['#4ecdc4', '#ffd166', '#ff6b6b', '#7fb7ff', '#c792ea'];
export const byId = (id: number): string => PALETTE[Math.abs(id) % PALETTE.length] ?? '#fff';
