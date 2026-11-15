// A green blob with four morph targets and a looping pulse clip
import { Glb, type PrimitiveDef } from './glb.ts';
import { finish, sphere, smoothNormals } from './geo.ts';
import { smoothstep } from './rig.ts';

const R = 0.5;
const SEG = 48;
const RINGS = 32;

/** Morph target names, in weight order (also written to mesh.extras.targetNames). */
export const BLOB_TARGETS = ['smile', 'squash', 'spike', 'stretch'] as const;
/** Clip names in the GLB. */
export const BLOB_ANIMATIONS = ['pulse'] as const;

type V3 = [number, number, number];

/** A displacement of the unit-sphere point p (with outward normal p) as a delta in unit-sphere space. */
const SHAPES: ((p: V3) => V3)[] = [
  // smile: a curved groove for the mouth and two raised cheeks on the +Z face
  ([x, y, z]) => {
    const front = smoothstep(0.35, 0.8, z);
    const d = y - (-0.2 + 0.75 * x * x);
    const groove = Math.exp(-((d / 0.07) ** 2)) * smoothstep(0.55, 0.3, Math.abs(x));
    const cheek = [-0.45, 0.45].reduce((s, cx) => s + Math.exp(-(((x - cx) ** 2 + (y + 0.05) ** 2) / 0.02)), 0);
    const k = front * (0.07 * cheek - 0.09 * groove);
    return [x * k, y * k, z * k];
  },
  // squash: flatten and widen, keeping the bottom on the ground
  ([x, y, z]) => [0.35 * x, -0.45 * y - 0.45, 0.35 * z],
  // spike: a lattice of points along the normal
  ([x, y, z]) => {
    const lon = Math.atan2(z, x);
    const lat = Math.asin(y);
    const k = 0.55 * Math.max(0, Math.cos(lon * 6) * Math.cos(lat * 8)) ** 4;
    return [x * k, y * k, z * k];
  },
  // stretch: taller and thinner, bottom fixed
  ([x, y, z]) => [-0.25 * x, 0.6 * y + 0.6, -0.25 * z],
];

/** The blob as a GLB: one mesh node with weights [0, 0, 0, 0] and a looping `pulse` clip. */
export function blobGlb(): ArrayBuffer {
  const glb = new Glb();
  const mat = glb.addMaterial({ name: 'blob', baseColor: [1, 1, 1], roughness: 0.4 });
  const g = finish(sphere(1, SEG, RINGS));
  const n = g.positions.length / 3;
  const base = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const unit: V3[] = [];
  for (let i = 0; i < n; i++) {
    const p: V3 = [g.positions[i * 3] ?? 0, g.positions[i * 3 + 1] ?? 0, g.positions[i * 3 + 2] ?? 0];
    unit.push(p);
    base.set([p[0] * R, R + p[1] * R, p[2] * R], i * 3);
    const eye = [-1, 1].reduce((s, side) => {
      const c: V3 = [side * 0.3, 0.28, 0.91];
      const dist = Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]);
      return Math.max(s, 1 - smoothstep(0.1, 0.16, dist));
    }, 0);
    const body = [0.18, 0.78, 0.3];
    colors.set(body.map((v, k) => v * (1 - eye) + [0.02, 0.03, 0.03][k]! * eye), i * 3);
  }
  const baseNormals = new Float32Array(smoothNormals(base, g.indices));
  const targets = SHAPES.map((shape) => {
    const delta = new Float32Array(n * 3);
    const moved = new Float32Array(base);
    unit.forEach((p, i) => {
      const d = shape(p);
      for (let k = 0; k < 3; k++) {
        delta[i * 3 + k] = d[k]! * R;
        moved[i * 3 + k] = (moved[i * 3 + k] ?? 0) + d[k]! * R;
      }
    });
    const normals = smoothNormals(moved, g.indices);
    return { POSITION: delta, NORMAL: Float32Array.from(normals, (v, i) => v - (baseNormals[i] ?? 0)) };
  });
  const prim: PrimitiveDef = { positions: base, normals: baseNormals, colors, indices: new Uint16Array(g.indices), material: mat, targets };
  const mesh = glb.addMesh({ name: 'Blob', primitives: [prim], weights: [0, 0, 0, 0], targetNames: [...BLOB_TARGETS] });
  const node = glb.addNode({ name: 'Blob', mesh, weights: [0, 0, 0, 0] });

  const keys = 25;
  const times = Float32Array.from({ length: keys }, (_, k) => (k / (keys - 1)) * 2);
  const values = new Float32Array(keys * 4);
  for (let k = 0; k < keys; k++) {
    const p = (k / (keys - 1)) * Math.PI * 2;
    values.set(
      [0.5 + 0.5 * Math.sin(p), 0.7 * (0.5 - 0.5 * Math.cos(2 * p)), 0.9 * (0.5 + 0.5 * Math.sin(p - 1.8)) ** 3, 0.6 * (0.5 + 0.5 * Math.cos(2 * p))],
      k * 4,
    );
  }
  glb.addAnimation({ name: 'pulse', channels: [{ node, path: 'weights', times, values }] });
  return glb.build([node]);
}
