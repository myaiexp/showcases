// Low-poly shapes (lathe, ellipsoid, box) and skin-weight helpers
import type { PrimitiveDef, Vec3 } from './glb.ts';

/** Triangle soup in plain arrays; `normals` is filled by finish(). Counter-clockwise front faces. */
export interface Geo {
  positions: number[];
  indices: number[];
  normals?: number[];
}

export interface LatheOptions {
  /** Axis position in x and z. */
  cx?: number;
  cz?: number;
  /** Radius multipliers per axis (an elliptical cross-section). */
  sx?: number;
  sz?: number;
  /** Vertices around each ring. */
  seg?: number;
}

/**
 * A surface of revolution around the Y axis. `rings` run bottom to top as [y, radius]; a ring
 * of radius 0 becomes one pole vertex, so a closed shape starts and ends with radius 0.
 */
export function lathe(rings: [number, number][], opts: LatheOptions = {}): Geo {
  const { cx = 0, cz = 0, sx = 1, sz = 1, seg = 12 } = opts;
  const positions: number[] = [];
  const indices: number[] = [];
  const first: number[] = [];
  const count: number[] = [];
  for (const [y, r] of rings) {
    first.push(positions.length / 3);
    if (r < 1e-6) {
      positions.push(cx, y, cz);
      count.push(1);
      continue;
    }
    for (let j = 0; j < seg; j++) {
      const a = (j / seg) * Math.PI * 2;
      positions.push(cx + Math.cos(a) * r * sx, y, cz + Math.sin(a) * r * sz);
    }
    count.push(seg);
  }
  const at = (i: number, j: number): number => (first[i] ?? 0) + (count[i] === 1 ? 0 : j % seg);
  const tri = (a: number, b: number, c: number): void => {
    if (a !== b && b !== c && a !== c) indices.push(a, b, c);
  };
  for (let i = 0; i + 1 < rings.length; i++) {
    for (let j = 0; j < seg; j++) {
      const a = at(i, j);
      const b = at(i, j + 1);
      const c = at(i + 1, j);
      const d = at(i + 1, j + 1);
      tri(a, c, b);
      tri(b, c, d);
    }
  }
  return { positions, indices };
}

/** An ellipsoid centred at (cx, cy, cz) with radii (rx, ry, rz). */
export function ellipsoid(c: Vec3, r: Vec3, seg = 12, rings = 8): Geo {
  const profile: [number, number][] = [];
  for (let i = 0; i <= rings; i++) {
    const a = -Math.PI / 2 + (i / rings) * Math.PI;
    profile.push([c[1] + Math.sin(a) * r[1], i === 0 || i === rings ? 0 : Math.cos(a)]);
  }
  return lathe(profile, { cx: c[0], cz: c[2], sx: r[0], sz: r[2], seg });
}

/** A unit-radius sphere profile with `rings` latitude bands, for morph-target blobs. */
export function sphere(radius: number, seg: number, rings: number): Geo {
  return ellipsoid([0, 0, 0], [radius, radius, radius], seg, rings);
}

const FACES: [Vec3, Vec3, Vec3][] = [
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
  [[0, 1, 0], [0, 0, 1], [1, 0, 0]],
  [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
  [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
  [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
];

/** An axis-aligned box with flat-shaded faces, centred at `c`, sized (w, h, d). */
export function box(c: Vec3, size: Vec3): Geo {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  for (const [n, u, v] of FACES) {
    const base = positions.length / 3;
    for (const [su, sv] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as [number, number][]) {
      for (let k = 0; k < 3; k++) {
        positions.push(c[k]! + (n[k]! + u[k]! * su + v[k]! * sv) * size[k]! * 0.5);
        normals.push(n[k]!);
      }
    }
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  return { positions, indices, normals };
}

/** Area-weighted smooth normals from the triangles. */
export function smoothNormals(positions: ArrayLike<number>, indices: ArrayLike<number>): number[] {
  const out = new Array<number>(positions.length).fill(0);
  const p = (i: number): number => positions[i] ?? 0;
  for (let t = 0; t < indices.length; t += 3) {
    const a = (indices[t] ?? 0) * 3;
    const b = (indices[t + 1] ?? 0) * 3;
    const c = (indices[t + 2] ?? 0) * 3;
    const [ux, uy, uz] = [p(b) - p(a), p(b + 1) - p(a + 1), p(b + 2) - p(a + 2)];
    const [vx, vy, vz] = [p(c) - p(a), p(c + 1) - p(a + 1), p(c + 2) - p(a + 2)];
    const n = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
    for (const v of [a, b, c]) for (let k = 0; k < 3; k++) out[v + k] = (out[v + k] ?? 0) + (n[k] ?? 0);
  }
  for (let i = 0; i < out.length; i += 3) {
    const [x, y, z] = [out[i] ?? 0, out[i + 1] ?? 0, out[i + 2] ?? 0];
    const len = Math.hypot(x, y, z) || 1;
    out[i] = x / len;
    out[i + 1] = y / len;
    out[i + 2] = z / len;
  }
  return out;
}

/** Returns the shape with normals filled in (smooth, unless it already has them). */
export function finish(g: Geo): Required<Geo> {
  return { ...g, normals: g.normals ?? smoothNormals(g.positions, g.indices) };
}

/** Joins shapes into one, keeping each one's own normals. */
export function merge(...parts: Geo[]): Required<Geo> {
  const out: Required<Geo> = { positions: [], indices: [], normals: [] };
  for (const part of parts) {
    const g = finish(part);
    const base = out.positions.length / 3;
    out.positions.push(...g.positions);
    out.normals.push(...g.normals);
    for (const i of g.indices) out.indices.push(i + base);
  }
  return out;
}

/** Up to four [joint, weight] influences for a vertex position. */
export type Influence = (x: number, y: number, z: number) => [number, number][];

/** Every vertex follows one joint. */
export const rigid =
  (joint: number): Influence =>
  () => [[joint, 1]];

/**
 * Blends along Y between joints. `stops` run from high y to low y as [y, joint]; between two
 * stops with different joints the weight eases from one to the other, so a bend there is smooth.
 */
export function blendByY(stops: [number, number][]): Influence {
  return (_x, y) => {
    const top = stops[0];
    if (!top || y >= top[0]) return [[top?.[1] ?? 0, 1]];
    for (let i = 0; i + 1 < stops.length; i++) {
      const [y0, j0] = stops[i]!;
      const [y1, j1] = stops[i + 1]!;
      if (y >= y1) {
        if (j0 === j1) return [[j0, 1]];
        const t = (y0 - y) / (y0 - y1);
        const s = t * t * (3 - 2 * t);
        return [
          [j0, 1 - s],
          [j1, s],
        ];
      }
    }
    return [[stops[stops.length - 1]![1], 1]];
  };
}

/** Packs a shape and its influences into a primitive with JOINTS_0 and WEIGHTS_0. */
export function skinned(g: Geo, influence: Influence, material: number): PrimitiveDef {
  const f = finish(g);
  const n = f.positions.length / 3;
  const joints = new Uint8Array(n * 4);
  const weights = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const list = influence(f.positions[i * 3] ?? 0, f.positions[i * 3 + 1] ?? 0, f.positions[i * 3 + 2] ?? 0).filter(([, w]) => w > 1e-4);
    const total = list.reduce((s, [, w]) => s + w, 0) || 1;
    list.slice(0, 4).forEach(([j, w], k) => {
      joints[i * 4 + k] = j;
      weights[i * 4 + k] = w / total;
    });
  }
  return {
    positions: new Float32Array(f.positions),
    normals: new Float32Array(f.normals),
    indices: n > 65535 ? new Uint32Array(f.indices) : new Uint16Array(f.indices),
    joints,
    weights,
    material,
  };
}

/** Packs a static shape into a primitive. */
export function staticPrim(g: Geo, material: number): PrimitiveDef {
  const f = finish(g);
  return {
    positions: new Float32Array(f.positions),
    normals: new Float32Array(f.normals),
    indices: f.positions.length / 3 > 65535 ? new Uint32Array(f.indices) : new Uint16Array(f.indices),
    material,
  };
}

/** Radius profile rings from key [y, radius] points, linear between keys, at most `step` apart. */
export function sampleProfile(keys: [number, number][], step: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i + 1 < keys.length; i++) {
    const [y0, r0] = keys[i]!;
    const [y1, r1] = keys[i + 1]!;
    const n = Math.max(1, Math.ceil((y1 - y0) / step));
    for (let k = 0; k < n; k++) out.push([y0 + ((y1 - y0) * k) / n, r0 + ((r1 - r0) * k) / n]);
  }
  out.push(keys[keys.length - 1]!);
  return out;
}

/** Concatenates primitives that share a material (all skinned or all not) into one draw call. */
export function mergePrims(prims: PrimitiveDef[]): PrimitiveDef {
  const total = prims.reduce((s, p) => s + p.positions.length / 3, 0);
  const skin = prims.every((p) => p.joints && p.weights);
  const out: PrimitiveDef = {
    positions: new Float32Array(total * 3),
    normals: new Float32Array(total * 3),
    indices: total > 65535 ? new Uint32Array(prims.reduce((s, p) => s + p.indices.length, 0)) : new Uint16Array(prims.reduce((s, p) => s + p.indices.length, 0)),
    material: prims[0]?.material,
  };
  if (skin) {
    out.joints = new Uint8Array(total * 4);
    out.weights = new Float32Array(total * 4);
  }
  let v = 0;
  let i = 0;
  for (const p of prims) {
    out.positions.set(p.positions, v * 3);
    out.normals?.set(p.normals ?? [], v * 3);
    if (skin) {
      out.joints?.set(p.joints ?? [], v * 4);
      out.weights?.set(p.weights ?? [], v * 4);
    }
    out.indices.set(Array.from(p.indices, (x) => x + v), i);
    v += p.positions.length / 3;
    i += p.indices.length;
  }
  return out;
}
