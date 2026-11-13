// Natural Earth countries (via world-atlas) converted from TopoJSON to GeoJSON
import type { Feature, FeatureCollection, Position } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

const topology = world as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;

/**
 * A ring that crosses the antimeridian (Fiji, eastern Russia) jumps from +180 to -180,
 * and a planar map draws that jump as a line across the whole world. Shifting the
 * western half of such a ring by +360 keeps it in one piece just past the right edge.
 */
function unwrap(ring: Position[]): Position[] {
  const lons = ring.map((p) => p[0]!);
  if (Math.max(...lons) - Math.min(...lons) < 180) return ring;
  return ring.map(([lon, lat]) => [lon! < 0 ? lon! + 360 : lon!, lat!]);
}

function fix(f: Feature): Feature {
  const g = f.geometry;
  if (g.type === 'Polygon') return { ...f, geometry: { ...g, coordinates: g.coordinates.map(unwrap) } };
  if (g.type === 'MultiPolygon') {
    return { ...f, geometry: { ...g, coordinates: g.coordinates.map((poly) => poly.map(unwrap)) } };
  }
  return f;
}

const all = feature(topology, topology.objects.countries) as FeatureCollection;

/** registerMap wants GeoJSON with a `name` per feature. Antarctica is left out: on a flat
 * map it takes a quarter of the height for no data. */
export const COUNTRIES: FeatureCollection = {
  type: 'FeatureCollection',
  features: all.features.filter((f) => f.properties?.['name'] !== 'Antarctica').map(fix),
};

export const NAMES = COUNTRIES.features.map((f) => String(f.properties?.['name'] ?? ''));
