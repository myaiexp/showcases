// The world as TopoJSON and GeoJSON for VChart.registerMap, registered once per page
import VChart from '@visactor/vchart';
import type { FeatureCollection } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

type Props = { name: string };
const source = world as unknown as Topology<{ countries: GeometryCollection<Props> }>;

const nameOf = (g: { properties?: unknown }): string => (g.properties as Props | undefined)?.name ?? '';

const SOUTH_AMERICA_NAMES = [
  'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana',
  'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela',
];

/** Same arcs as world-atlas, with Antarctica dropped (it fills a quarter of a Mercator map) and a second object. */
export const WORLD_TOPOLOGY: Topology<{ countries: GeometryCollection<Props>; 'south-america': GeometryCollection<Props> }> = {
  ...source,
  objects: {
    countries: {
      ...source.objects.countries,
      geometries: source.objects.countries.geometries.filter((g) => nameOf(g) !== 'Antarctica'),
    },
    'south-america': {
      ...source.objects.countries,
      geometries: source.objects.countries.geometries.filter((g) => SOUTH_AMERICA_NAMES.includes(nameOf(g))),
    },
  },
};

/** Map names, namespaced so they cannot clash with another example's registration. */
export const WORLD_TOPO = 'vchart-world-topojson';
export const WORLD_GEO = 'vchart-world-geojson';
export const SOUTH_AMERICA = 'vchart-south-america';

export const WORLD_GEOJSON = feature(WORLD_TOPOLOGY, WORLD_TOPOLOGY.objects.countries) as FeatureCollection;
/** Every country's name in the base map. */
export const COUNTRY_NAMES = WORLD_GEOJSON.features.map((f) => String(f.properties?.['name'] ?? ''));

let done = false;
/**
 * registerMap is page-wide and re-registering warns, so every map goes in once and is never
 * unregistered: another example (or card) may be drawing from it.
 */
export function registerWorldMaps(): void {
  if (done) return;
  done = true;
  VChart.registerMap(WORLD_TOPO, WORLD_TOPOLOGY, { type: 'topojson', object: 'countries' });
  VChart.registerMap(WORLD_GEO, WORLD_GEOJSON, { type: 'geojson' });
  VChart.registerMap(SOUTH_AMERICA, WORLD_TOPOLOGY, { type: 'topojson', object: 'south-america' });
}

/** Seeded values for a list of countries, so the same load draws the same map. */
export function countryValues(names: readonly string[], seed: number, max = 100): { name: string; value: number }[] {
  let s = seed >>> 0 || 1;
  return names.map((name) => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return { name, value: Math.round((s / 4294967296) * max) };
  });
}
