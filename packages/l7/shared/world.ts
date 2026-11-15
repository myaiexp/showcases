// Offline basemap: Natural Earth countries and dim land and border layers
import { type ILayer, LineLayer, PolygonLayer } from '@antv/l7';
import type { Feature, FeatureCollection, Geometry, MultiLineString, Position } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

// Cards must not touch the network and the docs' basemaps all load tiles or a token, so the
// examples draw on this local data instead. Natural Earth (public domain), via world-atlas.
const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;

/**
 * Makes each ring's longitudes continuous (Natural Earth splits rings at ±180°), then clamps
 * them to ±180: L7 triangulates a ring that runs past the antimeridian into a wedge across
 * the map, while a clamped ring just ends at the map's edge.
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
    return [Math.max(-180, Math.min(180, x)), lat];
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
  /** A stable number per country (its index), handy for colour mapping. */
  id: number;
}

/** Every country except Antarctica (its pole-wrapping ring cannot be unwrapped). */
export const countries: FeatureCollection<Geometry, CountryProps> = {
  type: 'FeatureCollection',
  features: all.features
    .filter((f) => f.properties?.['name'] !== 'Antarctica')
    .map(
      (f, i): Feature<Geometry, CountryProps> => ({
        type: 'Feature',
        properties: { name: String(f.properties?.['name'] ?? ''), id: i + 1 },
        geometry: unwrapGeometry(f.geometry),
      }),
    ),
};

/** Borders shared by two countries, as one MultiLineString. */
export const borders: MultiLineString = mesh(topology, topology.objects.countries, (a, b) => a !== b);

/** Countries whose name is in the list, as their own FeatureCollection. */
export function pickCountries(names: readonly string[]): FeatureCollection<Geometry, CountryProps> {
  return { type: 'FeatureCollection', features: countries.features.filter((f) => names.includes(f.properties.name)) };
}

export const LAND = '#1e2938';
export const BORDER = '#3e4e63';

/**
 * Scenery, not a subject: dim land with borders, for examples whose data needs a world under
 * it. Add these first so the example's own layers draw on top.
 */
export function worldLayers(opts: { land?: string; border?: string } = {}): [ILayer, ILayer] {
  const land = new PolygonLayer({ name: 'basemap-land', zIndex: -2 })
    .source(countries)
    .shape('fill')
    .color(opts.land ?? LAND)
    .style({ opacity: 1 });
  const lines = new LineLayer({ name: 'basemap-borders', zIndex: -1 })
    .source({ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: borders }] })
    .shape('line')
    .size(0.6)
    .color(opts.border ?? BORDER);
  return [land, lines];
}
