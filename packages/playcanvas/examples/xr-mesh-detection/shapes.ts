// Simulated XrMesh data: a bumpy floor patch and a box
import * as pc from 'playcanvas';

export interface MeshData {
  vertices: Float32Array;
  indices: Uint32Array;
}

/** A bumpy patch on the XZ plane, like a reconstructed floor; `reveal` 0..1 shows rows from the front. */
export function floorPatch(size: number, n: number, reveal = 1): MeshData {
  const rows = Math.max(1, Math.round(n * reveal));
  const vertices = new Float32Array((rows + 1) * (n + 1) * 3);
  const indices: number[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= n; c++) {
      const x = (c / n - 0.5) * size;
      const z = (r / n) * size - size / 2;
      const y = Math.sin(x * 2.1) * Math.cos(z * 1.7) * 0.03;
      vertices.set([x, y, z], (r * (n + 1) + c) * 3);
      if (r < rows && c < n) {
        const i = r * (n + 1) + c;
        indices.push(i, i + n + 1, i + 1, i + 1, i + n + 1, i + n + 2);
      }
    }
  }
  return { vertices, indices: new Uint32Array(indices) };
}

/** A box centred on the origin. */
export function boxData(w: number, h: number, d: number): MeshData {
  const v: number[] = [];
  for (const y of [-h / 2, h / 2]) for (const z of [-d / 2, d / 2]) for (const x of [-w / 2, w / 2]) v.push(x, y, z);
  const indices = [0, 1, 3, 0, 3, 2, 4, 6, 7, 4, 7, 5, 0, 4, 5, 0, 5, 1, 2, 3, 7, 2, 7, 6, 0, 2, 6, 0, 6, 4, 1, 5, 7, 1, 7, 3];
  return { vertices: new Float32Array(v), indices: new Uint32Array(indices) };
}

/** The pose and label a detected mesh carries. */
export interface SimPose {
  label: string;
  position: pc.Vec3;
  euler: pc.Vec3;
}
