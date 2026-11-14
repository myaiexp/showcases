// Builds a binary 3DGS .ply file in memory: header plus one float row per splat
import { hue, rng } from '../../shared/gsplat.ts';

const PROPERTIES = ['x', 'y', 'z', 'f_dc_0', 'f_dc_1', 'f_dc_2', 'opacity', 'scale_0', 'scale_1', 'scale_2', 'rot_0', 'rot_1', 'rot_2', 'rot_3'];
const SH_C0 = 0.28209479177387814; // degree-0 spherical harmonic, colour = 0.5 + SH_C0 * f_dc

export function plyHeader(count: number): string {
  return ['ply', 'format binary_little_endian 1.0', `element vertex ${count}`, ...PROPERTIES.map((p) => `property float ${p}`), 'end_header', ''].join('\n');
}

/** A fuzzy spiral ribbon: positions, colours and sizes stored the way trainers store them. */
export function buildPly(count: number, seed = 5): Uint8Array {
  const header = new TextEncoder().encode(plyHeader(count));
  const bytes = new Uint8Array(header.length + count * PROPERTIES.length * 4);
  bytes.set(header);
  const view = new DataView(bytes.buffer);
  const r = rng(seed);
  const row = new Float32Array(PROPERTIES.length);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const a = t * Math.PI * 10;
    const radius = 0.4 + t * 1.6;
    const x = Math.cos(a) * radius + (r() - 0.5) * 0.12;
    const y = (t - 0.5) * 3 + (r() - 0.5) * 0.12;
    const z = Math.sin(a) * radius + (r() - 0.5) * 0.12;
    const [cr, cg, cb] = hue(t * 0.85, 0.7, 1);
    const size = 0.035 + r() * 0.02;
    row.set([
      x, y, z,
      (cr - 0.5) / SH_C0, (cg - 0.5) / SH_C0, (cb - 0.5) / SH_C0, // f_dc_0..2: base colour
      Math.log(0.85 / 0.15), // opacity is stored as a logit
      Math.log(size), Math.log(size), Math.log(size * 0.6), // scales are stored as logs
      1, 0, 0, 0, // rot_0..3: quaternion w, x, y, z
    ]);
    for (let k = 0; k < row.length; k++) view.setFloat32(header.length + (i * row.length + k) * 4, row[k]!, true);
  }
  return bytes;
}
