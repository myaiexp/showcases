// Geo layers chapter: cell ids made from coordinates (geohash, quadkey, S2, A5, counts)
import { lonLatToCell, u64ToHex } from 'a5-js';
import type { LngLat } from './data.ts';

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

/** Geohash of a position: interleaved longitude/latitude bisections, 5 bits per character. */
export function geohashOf([lng, lat]: LngLat, precision: number): string {
  let lngRange: [number, number] = [-180, 180];
  let latRange: [number, number] = [-90, 90];
  let out = '';
  let bits = 0;
  let value = 0;
  let evenBit = true;
  while (out.length < precision) {
    const range = evenBit ? lngRange : latRange;
    const target = evenBit ? lng : lat;
    const mid = (range[0] + range[1]) / 2;
    value <<= 1;
    if (target >= mid) {
      value |= 1;
      range[0] = mid;
    } else {
      range[1] = mid;
    }
    evenBit = !evenBit;
    if (++bits === 5) {
      out += BASE32[value];
      bits = 0;
      value = 0;
    }
  }
  return out;
}

/** Bing-style quadkey of the web-mercator tile at `level` that holds the position. */
export function quadkeyOf([lng, lat]: LngLat, level: number): string {
  const n = 2 ** level;
  const x = Math.min(n - 1, Math.floor(((lng + 180) / 360) * n));
  const rad = (lat * Math.PI) / 180;
  const y = Math.min(n - 1, Math.max(0, Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n)));
  let key = '';
  for (let i = level; i > 0; i--) {
    const mask = 1 << (i - 1);
    key += (x & mask ? 1 : 0) + (y & mask ? 2 : 0);
  }
  return key;
}

/** Children of a quadkey, one level down. */
export function quadkeyChildren(key: string): string[] {
  return ['0', '1', '2', '3'].map((d) => key + d);
}

/** S2 Hilbert quad key: face 0-5, then one digit 0-3 per level, e.g. "0/1203". */
export function s2Key(face: number, digits: string): string {
  return `${face}/${digits}`;
}

/** S2 hex token for a face and Hilbert digit path: id bits are face, path, then a lone 1 bit. */
export function s2Token(face: number, digits: string): string {
  let id = BigInt(face) << 61n;
  for (let i = 0; i < digits.length; i++) id |= BigInt(Number(digits[i])) << BigInt(59 - 2 * i);
  id |= 1n << BigInt(60 - 2 * digits.length);
  return id.toString(16).padStart(16, '0').replace(/0+$/, '') || '0';
}

/** A5 cell id (64-bit) at a resolution. */
export function a5CellAt([lng, lat]: LngLat, resolution: number): bigint {
  // a5-js types its position as a branded tuple; a plain [lng, lat] is what it reads.
  return lonLatToCell([lng, lat] as unknown as Parameters<typeof lonLatToCell>[0], resolution);
}

/** The A5 id as the base-16 string the layer also accepts. */
export function a5Hex(cell: bigint): string {
  return u64ToHex(cell);
}

/** Counts items per key. */
export function countBy<T>(items: readonly T[], key: (item: T) => string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return counts;
}

/** A cell id with its count, the shape the cell layers read. */
export interface CellCount<K = string> {
  id: K;
  count: number;
}

/** Map entries as cell records, busiest cell first. */
export function toCells<K>(counts: Map<K, number>): CellCount<K>[] {
  return [...counts].map(([id, count]) => ({ id, count })).sort((a, b) => b.count - a.count);
}

/** Colour ramp for counts: dark teal through yellow to red, `t` in 0..1. */
export function heat(t: number): [number, number, number] {
  const stops: [number, number, number][] = [[24, 70, 110], [30, 150, 160], [250, 230, 110], [240, 90, 60]];
  const x = Math.min(0.9999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const [a, b] = [stops[i]!, stops[i + 1]!];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}
