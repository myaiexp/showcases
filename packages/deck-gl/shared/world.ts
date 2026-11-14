// Offline basemap: Natural Earth countries as GeoJSON and a dark land layer
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, FeatureCollection, Geometry, MultiLineString, Position } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

// Gallery cards must not touch the network, so examples draw on this local data instead of
// a hosted tile server. Natural Earth (public domain), via world-atlas.
const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;

/**
 * Makes each ring's longitudes continuous. Natural Earth splits rings at ±180°, so a ring
 * like Russia's jumps from 180 to -180; drawn as-is that jump is a band across the world.
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

export interface CountryProps {
  name: string;
}

/** Every country except Antarctica (its pole-wrapping ring cannot be unwrapped), with `name`. */
export const countries: FeatureCollection<Geometry, CountryProps> = {
  type: 'FeatureCollection',
  features: all.features
    .filter((f) => f.properties?.['name'] !== 'Antarctica')
    .map(
      (f, i): Feature<Geometry, CountryProps> => ({
        type: 'Feature',
        id: i + 1,
        properties: { name: String(f.properties?.['name'] ?? '') },
        geometry: unwrapGeometry(f.geometry),
      }),
    ),
};

/** Borders shared by two countries, as one MultiLineString. */
export const borders: MultiLineString = mesh(topology, topology.objects.countries, (a, b) => a !== b);

/** Basemap colours (RGB) for land and borders on the dark ocean of the stage. */
export const LAND: [number, number, number] = [30, 41, 56];
export const BORDER: [number, number, number] = [62, 78, 99];

/**
 * Scenery, not a subject: a GeoJsonLayer of land with borders, for examples whose data
 * needs a world under it. Put it first in `layers` so the example's own layers draw on top.
 */
export function landLayer(id = 'basemap'): GeoJsonLayer {
  return new GeoJsonLayer({
    id,
    data: countries,
    filled: true,
    stroked: true,
    getFillColor: LAND,
    getLineColor: BORDER,
    lineWidthMinPixels: 0.5,
    lineWidthUnits: 'pixels',
    getLineWidth: 0.5,
    pickable: false,
  });
}
