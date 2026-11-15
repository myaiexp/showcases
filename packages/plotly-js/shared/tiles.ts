// Offline tile maps: a source-less dark MapLibre style, GeoJSON land and states
import type { FeatureCollection, Geometry } from 'geojson';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { loadGeoAssets } from './geo.ts';

/**
 * A MapLibre style object for layout.map.style (the map reference allows a style object
 * as well as a name or URL). It has no sources, so the map fetches nothing: no tiles, no
 * sprite, and no glyphs, which is why tile-map examples here never draw text on the map.
 * Land comes from layout.map.layers with the GeoJSON below.
 */
export function darkMapStyle(background = '#10141b'): Record<string, unknown> {
  return {
    version: 8,
    name: 'showcase-dark-blank',
    sources: {},
    layers: [{ id: 'background', type: 'background', paint: { 'background-color': background } }],
  };
}

type Countries = FeatureCollection<Geometry, { name: string }>;
/** Natural Earth scale: 110m for world views, 50m once a map zooms to a region. */
export type Detail = '110m' | '50m';
const countries = new Map<Detail, Promise<Countries>>();

/** Natural Earth countries (world-atlas), as GeoJSON with `id` and `properties.name`. */
export function countriesGeoJSON(detail: Detail = '110m'): Promise<Countries> {
  let hit = countries.get(detail);
  if (!hit) {
    const load = detail === '50m' ? import('world-atlas/countries-50m.json') : import('world-atlas/countries-110m.json');
    hit = load.then((m) => {
      const topo = m.default as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
      return feature(topo, topo.objects.countries) as Countries;
    });
    countries.set(detail, hit);
  }
  return hit;
}

/**
 * map.layers entries that draw land and borders under the traces: a fill of every country
 * and a thin line around each. Spread them into layout.map.layers.
 */
export async function landLayers(
  { detail = '110m', fill = '#232a36', line = '#3b4454' }: { detail?: Detail; fill?: string; line?: string } = {},
): Promise<Record<string, unknown>[]> {
  const geo = await countriesGeoJSON(detail);
  return [
    { sourcetype: 'geojson', source: geo, type: 'fill', color: fill, below: 'traces' },
    { sourcetype: 'geojson', source: geo, type: 'line', color: line, line: { width: 0.6 }, below: 'traces' },
  ];
}

let states: Promise<FeatureCollection> | null = null;

/**
 * US states as GeoJSON, read from the usa_110m topojson plotly.js ships in its geo assets.
 * Each feature's `id` is the state's two-letter code (what locationmode 'USA-states' uses).
 */
export function usStatesGeoJSON(): Promise<FeatureCollection> {
  states ??= loadGeoAssets().then(() => {
    const topo = window.PlotlyGeoAssets?.topojson['usa_110m'] as Topology | undefined;
    const layer = topo?.objects['subunits'] as GeometryCollection | undefined;
    if (!topo || !layer) throw new Error('plotly-js: usa_110m subunits missing from the geo assets');
    return feature(topo, layer) as FeatureCollection;
  });
  return states;
}
