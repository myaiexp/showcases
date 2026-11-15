// Source demos: places as GeoJSON, a toy polygon ring, a short layer-count reader
import type { Feature, FeatureCollection, Geometry, Point, Polygon } from 'geojson';
import { type Place, PLACES } from './comp-demo.ts';
import { countries } from './world.ts';

/** PLACES as GeoJSON points, every field in properties. */
export function placeFeatures(list: readonly Place[] = PLACES): FeatureCollection<Point, Place> {
  return {
    type: 'FeatureCollection',
    features: list.map((p): Feature<Point, Place> => ({ type: 'Feature', properties: p, geometry: { type: 'Point', coordinates: [p.lng, p.lat] } })),
  };
}

/** A ring of `n` vertices round a centre, closed, in the [[lng, lat], …] form of a GeoJSON polygon ring. */
export function ring(center: [number, number], r: number, n = 6, skew = 1.4, turn = 0): number[][] {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = turn + (i / n) * Math.PI * 2;
    return [center[0] + Math.cos(a) * r * skew, center[1] + Math.sin(a) * r];
  });
  return [...pts, pts[0] ?? [0, 0]];
}

/** One small hexagon polygon per place, as a GeoJSON collection with the place's fields. */
export function placeHexagons(list: readonly Place[] = PLACES, r = 1.1): FeatureCollection<Polygon, Place> {
  return {
    type: 'FeatureCollection',
    features: list.map((p): Feature<Polygon, Place> => ({ type: 'Feature', properties: p, geometry: { type: 'Polygon', coordinates: [ring([p.lng, p.lat], r)] } })),
  };
}

/** The world's countries with plain-object properties (name, id), the shape encodeTile() takes. */
export const countryTiles: FeatureCollection<Geometry, Record<string, unknown>> = {
  type: 'FeatureCollection',
  features: countries.features.map((f) => ({ ...f, properties: { ...f.properties } })),
};
