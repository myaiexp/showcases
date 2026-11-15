// Line sample data made in code: routes, wandering paths, wall rings, 3D polylines, shared timers
import type { Feature, FeatureCollection, LineString } from 'geojson';
import type { ILayer, Scene } from '@antv/l7';
import { cities, rng, routesFrom, type City } from './data.ts';
import type { Stage } from './stage.ts';

/** The parser the docs use for from/to rows: x/y is the start, x1/y1 the end. */
export const PARSER = { parser: { type: 'json', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' } } as const;

const kinds = ['move_out', 'move_in', 'transit'] as const;
const kindColor: Record<string, string> = { move_out: '#ff8a65', move_in: '#4fc3f7', transit: '#aed581' };

export interface Row {
  from: string;
  to: string;
  lng1: number;
  lat1: number;
  lng2: number;
  lat2: number;
  count: number;
  /** A category, like the docs' `type` column. */
  type: string;
  /** A width a layer can read with size('lineSize'). */
  lineSize: number;
  /** A colour a layer can read with color('c'). */
  c: string;
}

/** Rows from one hub to n other cities (stands in for the docs' lng1/lat1/lng2/lat2 CSV). */
export function rows(hub: string, n: number, pool: readonly City[] = cities, seed = 3): Row[] {
  const r = rng(seed + 11);
  return routesFrom(hub, pool, seed)
    .slice(0, n)
    .map((rt) => {
      const type = kinds[Math.floor(r() * kinds.length)] ?? 'transit';
      return { ...rt, type, lineSize: 1 + Math.round(rt.count / 20), c: kindColor[type] ?? '#fff' };
    });
}

/** The same rows as the CSV text the docs' source() page shows. */
export function csvText(list: readonly Row[]): string {
  const head = 'from,to,count,type,lng1,lat1,lng2,lat2';
  return [head, ...list.map((o) => [o.from, o.to, o.count, o.type, o.lng1, o.lat1, o.lng2, o.lat2].join(','))].join('\n');
}

export const EUROPE = cities.filter((c) => c.continent === 'Europe');
/** Cities west of the date line crossing: great circles to them never wrap the map edge. */
export const NO_DATELINE = cities.filter((c) => c.lng > -125 && c.lng < 100);
export const WORLD_VIEW = { center: [15, 25] as [number, number], zoom: 1.2, cardZoom: 0.2 };

export interface PathProps {
  id: number;
  type: 'path' | 'road' | 'rail';
  lineSize: number;
  c: string;
  height: number;
}

/** Random-walk polylines (stand in for the docs' road/route JSON). `z` adds a height per vertex. */
export function paths(
  center: [number, number],
  opts: { n?: number; steps?: number; step?: number; seed?: number; z?: boolean } = {},
): FeatureCollection<LineString, PathProps> {
  const { n = 8, steps = 14, step = 1, seed = 5, z = false } = opts;
  const r = rng(seed);
  const types = ['path', 'road', 'rail'] as const;
  const colors = ['#4fc3f7', '#ffb74d', '#ba68c8'];
  const features = Array.from({ length: n }, (_, i): Feature<LineString, PathProps> => {
    let lng = center[0] + (r() - 0.5) * step * 10;
    let lat = center[1] + (r() - 0.5) * step * 7;
    let dir = r() * Math.PI * 2;
    const coordinates: number[][] = [];
    for (let k = 0; k < steps; k++) {
      coordinates.push(z ? [lng, lat, 20 + Math.round(r() * 80)] : [lng, lat]);
      dir += (r() - 0.5) * 1.1;
      lng += Math.cos(dir) * step;
      lat += Math.sin(dir) * step * 0.8;
    }
    const t = i % 3;
    return {
      type: 'Feature',
      properties: { id: i, type: types[t] ?? 'path', lineSize: 1 + t, c: colors[t] ?? '#fff', height: 20 + Math.round(r() * 80) },
      geometry: { type: 'LineString', coordinates },
    };
  });
  return { type: 'FeatureCollection', features };
}

/** A wobbly closed ring around a centre (stands in for the docs' geofence outline). */
export function ring(center: [number, number], radius = 5, seed = 2): FeatureCollection<LineString, { height: number }> {
  const r = rng(seed);
  const coordinates: number[][] = [];
  const n = 36;
  for (let i = 0; i <= n; i++) {
    const a = ((i % n) / n) * Math.PI * 2;
    const k = 0.75 + 0.25 * Math.sin(a * 3 + 1) + (i === n ? 0 : (r() - 0.5) * 0.08);
    coordinates.push([center[0] + Math.cos(a) * radius * k * 1.4, center[1] + Math.sin(a) * radius * k]);
  }
  coordinates[n] = coordinates[0] ?? [];
  return {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: { height: 100 }, geometry: { type: 'LineString', coordinates } }],
  };
}

/** Re-applies a style to a live layer and redraws (layer.style() then scene.render()). */
export function restyle(scene: Scene, layer: ILayer, style: Record<string, unknown>): void {
  layer.style(style);
  scene.render();
}

/** Cards: calls fn(i) on a timer so a style option sweeps through its values. */
export function sweep(stage: Stage, ms: number, fn: (i: number) => void): void {
  stage.every(ms, fn);
}

/** Cards: the camera drifts a little around the start so a still layer still looks alive. */
export function drift(stage: Stage, scene: Scene, center: [number, number], amp = [8, 3]): void {
  stage.every(80, (i) => scene.setCenter([center[0] + Math.sin(i / 40) * (amp[0] ?? 0), center[1] + Math.cos(i / 55) * (amp[1] ?? 0)]));
}

/** A wave 0..1..0 for step i with the given period (in steps). */
export function wave(i: number, period: number): number {
  return (1 - Math.cos((i / period) * Math.PI * 2)) / 2;
}

/** n short random arcs over a region (stands in for the docs' wind-field CSV of lng1/lat1/lng2/lat2). */
export function windArcs(n: number, box: [number, number, number, number] = [-25, 35, 45, 70], seed = 9): Row[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const lng1 = box[0] + r() * (box[2] - box[0]);
    const lat1 = box[1] + r() * (box[3] - box[1]);
    return {
      from: `w${i}`, to: `w${i}`, lng1, lat1, lng2: lng1 + 4 + r() * 8, lat2: lat1 + (r() - 0.5) * 6,
      count: Math.round(r() * 100), type: 'transit', lineSize: 1, c: '#6495ED',
    };
  });
}
