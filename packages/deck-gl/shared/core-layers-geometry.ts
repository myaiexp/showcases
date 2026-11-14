// Sample shapes for the core-layer chapter: rings, wavy paths, city blocks, a sphere cloud
import { gaussian, seeded, type LngLat } from './data.ts';

/** Centre of the neighbourhood-scale examples; zoom ~13 shows a few kilometres. */
export const HOME: LngLat = [-122.42, 37.77];

/** Degrees of longitude that span the same distance as `deg` degrees of latitude at `lat`. */
export const lngPerLat = (lat: number): number => 1 / Math.cos((lat * Math.PI) / 180);

/** A closed ring (first vertex repeated) of `n` corners; `inner` < 1 alternates radii into a star. */
export function ngon(centre: LngLat, radius: number, n: number, rotation = 0, inner = 1): LngLat[] {
  const ring: LngLat[] = [];
  const corners = inner === 1 ? n : n * 2;
  for (let i = 0; i < corners; i++) {
    const a = rotation + (i / corners) * Math.PI * 2;
    const r = i % 2 === 1 && inner !== 1 ? radius * inner : radius;
    ring.push([centre[0] + Math.cos(a) * r * lngPerLat(centre[1]), centre[1] + Math.sin(a) * r]);
  }
  ring.push(ring[0]!);
  return ring;
}

/** A sine-wave polyline starting at `origin`, `length` degrees long, `n` vertices. */
export function wave(origin: LngLat, length: number, amp: number, waves = 2, n = 48, phase = 0): LngLat[] {
  const out: LngLat[] = [];
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    out.push([origin[0] + u * length * lngPerLat(origin[1]), origin[1] + Math.sin(phase + u * waves * Math.PI * 2) * amp]);
  }
  return out;
}

export interface Block {
  name: string;
  /** Closed ring around the block. */
  polygon: LngLat[];
  /** Height in metres. */
  height: number;
  /** 0..1 for colour ramps. */
  value: number;
  centre: LngLat;
}

/**
 * A `cols` x `rows` grid of city blocks around `origin`, each a jittered rectangle with a
 * seeded height. `cell` is the block pitch in degrees of latitude.
 */
export function blocks(cols: number, rows: number, { seed = 3, cell = 0.004, origin = HOME } = {}): Block[] {
  const rand = seeded(seed);
  const out: Block[] = [];
  const dx = cell * lngPerLat(origin[1]);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cx = origin[0] + (i - (cols - 1) / 2) * dx;
      const cy = origin[1] + (j - (rows - 1) / 2) * cell;
      const w = dx * (0.3 + rand() * 0.15);
      const h = cell * (0.3 + rand() * 0.15);
      const value = rand();
      out.push({
        name: `Block ${String.fromCharCode(65 + (i % 26))}${j + 1}`,
        polygon: [[cx - w, cy - h], [cx - w, cy + h], [cx + w, cy + h], [cx + w, cy - h], [cx - w, cy - h]],
        height: 40 + value * value * 500,
        value,
        centre: [cx, cy],
      });
    }
  }
  return out;
}

export interface CloudPoint {
  position: [number, number, number];
  normal: [number, number, number];
  color: [number, number, number];
}

/** Points on a bumpy sphere of the given radius, each with its outward unit normal. */
export function sphereCloud(n: number, radius = 100, seed = 5): CloudPoint[] {
  const rand = seeded(seed);
  const out: CloudPoint[] = [];
  for (let i = 0; i < n; i++) {
    const nx = gaussian(rand);
    const ny = gaussian(rand);
    const nz = gaussian(rand);
    const len = Math.hypot(nx, ny, nz) || 1;
    const normal: [number, number, number] = [nx / len, ny / len, nz / len];
    const r = radius * (1 + 0.12 * Math.sin(normal[0] * 6) * Math.cos(normal[1] * 5));
    out.push({
      position: [normal[0] * r, normal[1] * r, normal[2] * r],
      normal,
      color: [120 + normal[0] * 100, 150 + normal[1] * 90, 190 + normal[2] * 60],
    });
  }
  return out;
}

export type Rgb = [number, number, number];

/** Seven bright colours that read on the dark stage. */
export const PALETTE: Rgb[] = [
  [255, 107, 107],
  [255, 184, 77],
  [255, 224, 102],
  [105, 219, 124],
  [77, 171, 247],
  [132, 94, 247],
  [247, 131, 180],
];

export interface Line {
  name: string;
  color: Rgb;
  path: LngLat[];
}

/** `count` stacked sine-wave lines around HOME, each with a name, a colour and a phase. */
export function waveLines(count = 7, spacing = 0.007, origin: LngLat = HOME): Line[] {
  const out: Line[] = [];
  for (let i = 0; i < count; i++) {
    const start: LngLat = [origin[0] - 0.035 * lngPerLat(origin[1]), origin[1] + (i - (count - 1) / 2) * spacing];
    out.push({
      name: `Line ${i + 1}`,
      color: PALETTE[i % PALETTE.length]!,
      path: wave(start, 0.07, 0.0022, 1.5 + (i % 3) * 0.5, 40, i * 0.8),
    });
  }
  return out;
}
