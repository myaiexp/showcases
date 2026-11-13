// Offline world basemap: Natural Earth countries and a style built on them
import type { StyleSpecification } from 'maplibre-gl';
import type { Feature, FeatureCollection, Geometry, MultiLineString, Point, Position } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

// Gallery cards must not touch the network, so every example draws on this local data
// instead of a hosted tile server. Natural Earth (public domain), via world-atlas.
const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;

/**
 * Makes each ring's longitudes continuous. Natural Earth splits rings at ±180°, so a ring
 * like Russia's jumps from 180 to -180; drawn as-is that jump is a band across the world.
 * Shifting by ±360 keeps the ring whole, and MapLibre draws it across the antimeridian.
 */
function unwrap(ring: Position[]): Position[] {
  let prev: number | undefined;
  return ring.map(([lng = 0, lat = 0]) => {
    let x = lng;
    if (prev !== undefined) {
      while (x - prev > 180) x -= 360;
      while (prev - x > 180) x += 360;
    }
    prev = x;
    return [x, lat];
  });
}

function unwrapGeometry(g: Geometry): Geometry {
  if (g.type === 'Polygon') return { ...g, coordinates: g.coordinates.map(unwrap) };
  if (g.type === 'MultiPolygon') return { ...g, coordinates: g.coordinates.map((p) => p.map(unwrap)) };
  return g;
}

const all = feature(topology, topology.objects.countries) as FeatureCollection;

/** Every country except Antarctica, whose pole-wrapping ring cannot be unwrapped. */
export const countries: FeatureCollection = {
  type: 'FeatureCollection',
  features: all.features
    .filter((f) => f.properties?.name !== 'Antarctica')
    .map((f, i) => ({ ...f, id: i + 1, geometry: unwrapGeometry(f.geometry) })),
};
export const borders: MultiLineString = mesh(
  topology,
  topology.objects.countries,
  (a, b) => a !== b,
);

/** The palette shared by the basemap and the examples drawn over it. */
export const palette = {
  ocean: '#0a1320',
  land: '#243447',
  landHover: '#2c3d52',
  border: '#4a6280',
  accent: '#e8a308',
  blue: '#58a6ff',
  green: '#22c55e',
  red: '#ef4444',
  purple: '#bc8cff',
  text: '#fafafa',
};

/**
 * A complete style document with no remote resources: an ocean background, a country fill
 * and shared borders. Examples add their own sources and layers on top.
 */
export function worldStyle(): StyleSpecification {
  return {
    version: 8,
    sources: {
      countries: { type: 'geojson', data: countries },
      borders: { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: borders } },
    },
    layers: [
      { id: 'ocean', type: 'background', paint: { 'background-color': palette.ocean } },
      {
        id: 'countries-fill',
        type: 'fill',
        source: 'countries',
        paint: { 'fill-color': palette.land },
      },
      {
        id: 'borders',
        type: 'line',
        source: 'borders',
        paint: { 'line-color': palette.border, 'line-width': 0.8 },
      },
    ],
  };
}

/** Named places used across examples, as [lng, lat]. */
export const cities = {
  helsinki: [24.94, 60.17],
  london: [-0.13, 51.51],
  newYork: [-74.0, 40.71],
  tokyo: [139.69, 35.69],
  sydney: [151.21, -33.87],
  saoPaulo: [-46.63, -23.55],
  cairo: [31.24, 30.04],
  mumbai: [72.88, 19.08],
  capeTown: [18.42, -33.92],
  mexicoCity: [-99.13, 19.43],
  reykjavik: [-21.94, 64.15],
  singapore: [103.82, 1.35],
} satisfies Record<string, [number, number]>;

export type CityName = keyof typeof cities;

/** Display names for the cities. */
export const cityLabels: Record<CityName, string> = {
  helsinki: 'Helsinki',
  london: 'London',
  newYork: 'New York',
  tokyo: 'Tokyo',
  sydney: 'Sydney',
  saoPaulo: 'São Paulo',
  cairo: 'Cairo',
  mumbai: 'Mumbai',
  capeTown: 'Cape Town',
  mexicoCity: 'Mexico City',
  reykjavik: 'Reykjavik',
  singapore: 'Singapore',
};

/** The cities as a point FeatureCollection; `name` is the display name. */
export function cityPoints(): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: (Object.keys(cities) as CityName[]).map(
      (key, i): Feature<Point> => ({
        type: 'Feature',
        id: i + 1,
        properties: { name: cityLabels[key] },
        geometry: { type: 'Point', coordinates: cities[key] },
      }),
    ),
  };
}

/** A seeded pseudo-random generator, so sample data is the same on every load. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}
