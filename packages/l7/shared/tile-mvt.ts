// Hand-encoded Mapbox Vector Tiles (protobuf) cut from in-memory GeoJSON, for offline vector tiles
import type { Feature, Geometry, Position } from 'geojson';
import { tileBounds, type Tile } from './tile-serve.ts';

const EXTENT = 4096;

class Out {
  bytes: number[] = [];
  varint(v: number): void {
    let n = Math.floor(v);
    while (n > 127) {
      this.bytes.push((n % 128) | 128);
      n = Math.floor(n / 128);
    }
    this.bytes.push(n);
  }
  tag(field: number, wire: number): void {
    this.varint(field * 8 + wire);
  }
  bytesField(field: number, data: number[]): void {
    this.tag(field, 2);
    this.varint(data.length);
    for (const b of data) this.bytes.push(b);
  }
  string(field: number, s: string): void {
    this.bytesField(field, [...new TextEncoder().encode(s)]);
  }
  uint(field: number, v: number): void {
    this.tag(field, 0);
    this.varint(v);
  }
}

const zig = (v: number): number => (v << 1) ^ (v >> 31);

/** Web Mercator y (0..1, north 0) of a latitude. */
const merc = (lat: number): number => 0.5 - Math.log(Math.tan(Math.PI / 4 + (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 360)) / (2 * Math.PI);

function toTile(t: Tile, [lng = 0, lat = 0]: Position): [number, number] {
  const n = 2 ** t.z;
  return [Math.round(((lng + 180) / 360 * n - t.x) * EXTENT), Math.round((merc(lat) * n - t.y) * EXTENT)];
}

const area = (r: [number, number][]): number => r.reduce((s, p, i) => s + (p[0] * (r[(i + 1) % r.length]?.[1] ?? 0) - (r[(i + 1) % r.length]?.[0] ?? 0) * p[1]), 0) / 2;

/** Sutherland-Hodgman clip of a ring to the tile box plus a margin. */
function clip(ring: [number, number][], lo: number, hi: number): [number, number][] {
  let pts = ring;
  const edges: ((p: [number, number]) => number)[] = [(p) => p[0] - lo, (p) => hi - p[0], (p) => p[1] - lo, (p) => hi - p[1]];
  for (const d of edges) {
    const next: [number, number][] = [];
    pts.forEach((p, i) => {
      const q = pts[(i + pts.length - 1) % pts.length] as [number, number];
      const dp = d(p);
      const dq = d(q);
      if ((dp >= 0) !== (dq >= 0)) {
        const k = dq / (dq - dp);
        next.push([q[0] + (p[0] - q[0]) * k, q[1] + (p[1] - q[1]) * k]);
      }
      if (dp >= 0) next.push(p);
    });
    pts = next;
    if (!pts.length) break;
  }
  return pts.map(([x, y]) => [Math.round(x), Math.round(y)]);
}

function ringCmds(pts: [number, number][], close: boolean): number[] {
  const out: number[] = [];
  let [px, py] = [0, 0];
  pts.forEach(([x, y], i) => {
    if (i === 0) out.push(1 | (1 << 3));
    else if (i === 1) out.push(2 | ((pts.length - 1) << 3));
    out.push(zig(x - px), zig(y - py));
    [px, py] = [x, y];
  });
  if (close) out.push(7 | (1 << 3));
  return out;
}

/** Geometry commands for one GeoJSON geometry in tile `t`, or null when nothing of it is on the tile. */
function encodeGeometry(t: Tile, g: Geometry): { type: 1 | 2 | 3; cmds: number[] } | null {
  const lo = -64;
  const hi = EXTENT + 64;
  if (g.type === 'Point' || g.type === 'MultiPoint') {
    const pts = (g.type === 'Point' ? [g.coordinates] : g.coordinates).map((c) => toTile(t, c)).filter(([x, y]) => x >= lo && x <= hi && y >= lo && y <= hi);
    if (!pts.length) return null;
    const cmds = [1 | (pts.length << 3)];
    let [px, py] = [0, 0];
    for (const [x, y] of pts) {
      cmds.push(zig(x - px), zig(y - py));
      [px, py] = [x, y];
    }
    return { type: 1, cmds };
  }
  if (g.type === 'LineString' || g.type === 'MultiLineString') {
    const lines = g.type === 'LineString' ? [g.coordinates] : g.coordinates;
    const cmds: number[] = [];
    for (const l of lines) {
      const pts = l.map((c) => toTile(t, c));
      if (pts.length < 2 || pts.every(([x]) => x < lo) || pts.every(([x]) => x > hi) || pts.every(([, y]) => y < lo) || pts.every(([, y]) => y > hi)) continue;
      cmds.push(...ringCmds(pts, false));
    }
    return cmds.length ? { type: 2, cmds } : null;
  }
  if (g.type === 'Polygon' || g.type === 'MultiPolygon') {
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    const cmds: number[] = [];
    for (const poly of polys) {
      poly.forEach((ring, ri) => {
        let pts = ring.map((c) => toTile(t, c));
        if (pts.length > 1 && pts[0]?.[0] === pts[pts.length - 1]?.[0] && pts[0]?.[1] === pts[pts.length - 1]?.[1]) pts = pts.slice(0, -1);
        pts = clip(pts, lo, hi);
        if (pts.length < 3) return;
        // MVT: exterior rings wind positive in tile space (y down), holes the other way.
        if (area(pts) > 0 !== (ri === 0)) pts.reverse();
        cmds.push(...ringCmds(pts, true));
      });
    }
    return cmds.length ? { type: 3, cmds } : null;
  }
  return null;
}

function inBounds(t: Tile, g: Geometry): boolean {
  const [w, s, e, n] = tileBounds(t);
  const mx = (e - w) * 0.1;
  const my = (n - s) * 0.1;
  const flat = (c: unknown): Position[] => (Array.isArray(c) && typeof c[0] === 'number' ? [c as Position] : Array.isArray(c) ? c.flatMap(flat) : []);
  const pts = g.type === 'GeometryCollection' ? [] : flat(g.coordinates);
  const lngs = pts.map((p) => p[0] ?? 0);
  const lats = pts.map((p) => p[1] ?? 0);
  return Math.max(...lngs) >= w - mx && Math.min(...lngs) <= e + mx && Math.max(...lats) >= s - my && Math.min(...lats) <= n + my;
}

/**
 * One MVT tile with a named layer per FeatureCollection: `layers` maps layer name (the
 * source layer a layer asks for) to its features, whose properties become tags.
 */
export function encodeTile(t: Tile, layers: Record<string, { features: Feature<Geometry, object | null>[] }>): ArrayBuffer {
  const tile = new Out();
  for (const [name, fc] of Object.entries(layers)) {
    const keys: string[] = [];
    const values: (string | number)[] = [];
    const feats: number[][] = [];
    let id = 0;
    for (const f of fc.features) {
      if (!inBounds(t, f.geometry)) continue;
      const geo = encodeGeometry(t, f.geometry);
      if (!geo) continue;
      const tags: number[] = [];
      for (const [k, v] of Object.entries((f.properties ?? {}) as Record<string, unknown>)) {
        if (typeof v !== 'string' && typeof v !== 'number') continue;
        let ki = keys.indexOf(k);
        if (ki < 0) ki = keys.push(k) - 1;
        let vi = values.indexOf(v);
        if (vi < 0) vi = values.push(v) - 1;
        tags.push(ki, vi);
      }
      const fo = new Out();
      fo.uint(1, ++id);
      const packed = new Out();
      tags.forEach((n) => packed.varint(n));
      fo.bytesField(2, packed.bytes);
      fo.uint(3, geo.type);
      const gp = new Out();
      geo.cmds.forEach((n) => gp.varint(n));
      fo.bytesField(4, gp.bytes);
      feats.push(fo.bytes);
    }
    if (!feats.length) continue;
    const lo = new Out();
    lo.uint(15, 2);
    lo.string(1, name);
    for (const f of feats) lo.bytesField(2, f);
    for (const k of keys) lo.string(3, k);
    for (const v of values) {
      const vo = new Out();
      if (typeof v === 'string') vo.string(1, v);
      else {
        vo.tag(3, 1);
        const buf = new DataView(new ArrayBuffer(8));
        buf.setFloat64(0, v, true);
        for (let i = 0; i < 8; i++) vo.bytes.push(buf.getUint8(i));
      }
      lo.bytesField(4, vo.bytes);
    }
    lo.uint(5, EXTENT);
    tile.bytesField(3, lo.bytes);
  }
  return new Uint8Array(tile.bytes).buffer;
}
