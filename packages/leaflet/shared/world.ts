// Natural Earth land, coasts, borders and labels from world-atlas, loaded once
import type { MultiLineString, MultiPolygon, Polygon } from 'geojson';
import { feature, mesh } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';

/** [south, west, north, east] in degrees. */
export type Box = readonly [number, number, number, number];

/** One country's polygons: each polygon is rings of [lng, lat, lng, lat, …]. */
export interface Shape {
  polys: Float64Array[][];
  box: Box;
}
export interface Line {
  pts: Float64Array;
  box: Box;
}
export interface Label {
  name: string;
  lat: number;
  lng: number;
  /** Rough span of the country's largest polygon, degrees: decides when the name fits. */
  span: number;
}
export interface World {
  land: Shape[];
  coast: Line[];
  borders: Line[];
  labels: Label[];
}

type Countries = Topology<{ countries: GeometryCollection<{ name: string }> }>;

function boxOf(rings: Float64Array[]): Box {
  let s = 90;
  let w = 180;
  let n = -90;
  let e = -180;
  for (const r of rings) {
    for (let i = 0; i < r.length; i += 2) {
      const lng = r[i] ?? 0;
      const lat = r[i + 1] ?? 0;
      if (lat < s) s = lat;
      if (lat > n) n = lat;
      if (lng < w) w = lng;
      if (lng > e) e = lng;
    }
  }
  return [s, w, n, e];
}

const flat = (ring: number[][]): Float64Array => Float64Array.from(ring.flatMap((p) => [p[0] ?? 0, p[1] ?? 0]));

function lines(geom: MultiLineString): Line[] {
  return geom.coordinates.map((ring) => {
    const pts = flat(ring);
    return { pts, box: boxOf([pts]) };
  });
}

/** Signed-area centroid of a ring, and its area in square degrees. */
function centroid(r: Float64Array): { lng: number; lat: number; area: number } {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i + 3 < r.length; i += 2) {
    const x0 = r[i] ?? 0;
    const y0 = r[i + 1] ?? 0;
    const x1 = r[i + 2] ?? 0;
    const y1 = r[i + 3] ?? 0;
    const f = x0 * y1 - x1 * y0;
    a += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  if (a === 0) return { lng: r[0] ?? 0, lat: r[1] ?? 0, area: 0 };
  return { lng: cx / (3 * a), lat: cy / (3 * a), area: Math.abs(a / 2) };
}

function build(topo: Countries): World {
  const land: Shape[] = [];
  const labels: Label[] = [];
  for (const f of feature(topo, topo.objects.countries).features) {
    const g = f.geometry as Polygon | MultiPolygon | null;
    if (!g) continue;
    const polys = (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).map((p) => p.map(flat));
    land.push({ polys, box: boxOf(polys.flat()) });
    let best = { lng: 0, lat: 0, area: -1 };
    for (const p of polys) {
      const c = p[0] ? centroid(p[0]) : best;
      if (c.area > best.area) best = c;
    }
    const name = f.properties?.name;
    if (name && best.area > 0) labels.push({ name, lat: best.lat, lng: best.lng, span: Math.sqrt(best.area) });
  }
  const coast = lines(mesh(topo, topo.objects.countries, (a, b) => a === b));
  const borders = lines(mesh(topo, topo.objects.countries, (a, b) => a !== b));
  labels.sort((a, b) => b.span - a.span);
  return { land, coast, borders, labels };
}

// Top-level await: any module importing this one waits until both scales are parsed, so tile
// painting can stay synchronous (TileLayer sets img.src inside createTile).
const [m110, m50] = await Promise.all([import('world-atlas/countries-110m.json'), import('world-atlas/countries-50m.json')]);

/** 1:110m for world views (zoom 0–2), 1:50m from zoom 3 in. */
export const world110: World = build(m110.default as unknown as Countries);
export const world50: World = build(m50.default as unknown as Countries);

export const worldFor = (zoom: number): World => (zoom <= 2 ? world110 : world50);

export function intersects(a: Box, b: Box): boolean {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}
