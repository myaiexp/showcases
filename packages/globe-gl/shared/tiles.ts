// Slippy-map tiles painted in code: a tile URL function with no network
import { geoBounds, geoGraticule10, geoMercator, geoPath } from 'd3-geo';
import type { Feature, FeatureCollection, Polygon } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import land50 from 'world-atlas/land-50m.json';
import { land as land110 } from './world.ts';

// `globeTileEngineUrl` wants a function from tile coordinates to an image URL. A hosted tile
// server is a network request, so these functions paint each 256px Web Mercator tile on a
// canvas from Natural Earth land and return it as a data: URL, cached per page.

const topo = land50 as unknown as Topology<{ land: GeometryCollection }>;
const land50Geo = feature(topo, topo.objects.land) as FeatureCollection;

/** One land polygon and its bounds: west, south, east, north (west > east when it wraps). */
interface Piece {
  feature: Feature<Polygon>;
  box: [number, number, number, number];
}

/**
 * Land split into single polygons with their bounds, so a tile draws only the polygons that
 * reach it. Drawing all of 1:50m land into every tile cost ~40 ms a tile and hundreds of MB
 * of garbage once the engine asked for dozens of tiles at a time.
 */
function pieces(land: FeatureCollection): Piece[] {
  const out: Piece[] = [];
  for (const f of land.features) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const coordinates of polys) {
      const feature: Feature<Polygon> = { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates } };
      const [[w, s], [e, n]] = geoBounds(feature);
      out.push({ feature, box: [w, s, e, n] });
    }
  }
  return out;
}

const PIECES: Record<'coarse' | 'fine', Piece[] | null> = { coarse: null, fine: null };

/** The land polygons that may touch a tile's lng/lat box (with a small margin). */
function landFor(l: number, x: number, y: number): FeatureCollection {
  const kind = l >= 3 ? 'fine' : 'coarse';
  const all = (PIECES[kind] ??= pieces(kind === 'fine' ? land50Geo : land110));
  const n = 2 ** l;
  const lat = (t: number): number => (Math.atan(Math.sinh(Math.PI * (1 - (2 * t) / n))) * 180) / Math.PI;
  const m = 1;
  const [w, e] = [(x / n) * 360 - 180 - m, ((x + 1) / n) * 360 - 180 + m];
  const [north, south] = [lat(y) + m, lat(y + 1) - m];
  const features = all
    .filter(({ box: [pw, ps, pe, pn] }) => ps <= north && pn >= south && (pw > pe || (pw <= e && pe >= w)))
    .map((p) => p.feature);
  return { type: 'FeatureCollection', features };
}

export type TileStyle = 'dark' | 'light' | 'grid';

const STYLES: Record<TileStyle, { ocean: string; land: string; coast: string; grid: string; text: string }> = {
  dark: { ocean: '#0b1426', land: '#24334c', coast: '#5671a0', grid: 'rgba(140,170,220,0.15)', text: 'transparent' },
  light: { ocean: '#a9c9e2', land: '#efe6cf', coast: '#8a7a5a', grid: 'rgba(40,70,100,0.18)', text: 'transparent' },
  grid: { ocean: '#0e1a2e', land: '#2b3d58', coast: '#6b8cc0', grid: 'rgba(140,170,220,0.2)', text: 'rgba(255,220,150,0.9)' },
};

const cache = new Map<string, string>();

/**
 * Returns a tile URL function in one style. `grid` writes each tile's `l/x/y` on it and
 * outlines it, so the tiling the engine asks for is visible.
 */
export function paintedTiles(style: TileStyle = 'dark'): (x: number, y: number, l: number) => string {
  return (x, y, l) => {
    const key = `${style}/${l}/${x}/${y}`;
    let url = cache.get(key);
    if (!url) {
      url = paintTile(style, x, y, l);
      cache.set(key, url);
    }
    return url;
  };
}

function paintTile(style: TileStyle, x: number, y: number, l: number): string {
  const s = STYLES[style];
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const world = size * 2 ** l;
  const projection = geoMercator()
    .scale(world / (2 * Math.PI))
    .translate([world / 2 - x * size, world / 2 - y * size])
    .clipExtent([
      [-2, -2],
      [size + 2, size + 2],
    ]);
  const path = geoPath(projection, ctx);
  ctx.fillStyle = s.ocean;
  ctx.fillRect(0, 0, size, size);
  ctx.beginPath();
  path(geoGraticule10());
  ctx.strokeStyle = s.grid;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  path(landFor(l, x, y));
  ctx.fillStyle = s.land;
  ctx.fill();
  ctx.strokeStyle = s.coast;
  ctx.lineWidth = 1;
  ctx.stroke();
  if (style === 'grid') {
    ctx.strokeStyle = 'rgba(255,220,150,0.6)';
    ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
    ctx.fillStyle = s.text;
    ctx.font = 'bold 22px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${l}/${x}/${y}`, size / 2, size / 2);
  }
  return canvas.toDataURL('image/png');
}
