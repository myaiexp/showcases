// World country features from world-atlas, plus a few city points
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry, Point } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import countries110 from 'world-atlas/countries-110m.json';

export interface CountryProps {
  name: string;
  value: number;
}
export type Country = Feature<Geometry, CountryProps>;

const topology = countries110 as unknown as Topology;
const collection = feature(topology, topology.objects.countries as GeometryCollection) as FeatureCollection<Geometry, { name: string }>;

/** Every country with a deterministic 0-100 value taken from its name. */
export const countries: readonly Country[] = collection.features
  .filter((f) => f.properties.name !== 'Antarctica')
  .map((f) => {
    let h = 7;
    for (const ch of f.properties.name) h = (h * 31 + ch.charCodeAt(0)) % 1009;
    return { ...f, properties: { name: f.properties.name, value: h % 100 } };
  });

export interface City {
  name: string;
  size: number;
}
export type CityPoint = Feature<Point, City>;

const cityRows: readonly (readonly [string, number, number, number])[] = [
  ['Tokyo', 139.7, 35.7, 37],
  ['Delhi', 77.2, 28.6, 31],
  ['Sao Paulo', -46.6, -23.5, 22],
  ['Cairo', 31.2, 30.0, 21],
  ['New York', -74, 40.7, 19],
  ['Lagos', 3.4, 6.5, 15],
  ['Moscow', 37.6, 55.8, 12],
  ['Sydney', 151.2, -33.9, 5],
  ['London', -0.1, 51.5, 9],
  ['Mexico City', -99.1, 19.4, 22],
];

export const cities: readonly CityPoint[] = cityRows.map(([name, lon, lat, size]) => ({
  type: 'Feature',
  properties: { name, size },
  geometry: { type: 'Point', coordinates: [lon, lat] },
}));
