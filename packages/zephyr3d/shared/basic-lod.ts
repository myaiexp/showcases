// Scaffolding for the level-of-detail examples: a row of meshes down the view and a readout per mesh
import { Vector3 } from '@zephyr3d/base';
import { Mesh, type Camera, type MeshMaterial, type Primitive, type Scene } from '@zephyr3d/scene';

/** `count` copies of one primitive, each further from a camera at z = +8 looking down -z. */
export function lodRow(scene: Scene, primitive: Primitive, material: MeshMaterial, count = 5, gap = 4): Mesh[] {
  const row: Mesh[] = [];
  for (let i = 0; i < count; i++) {
    const mesh = new Mesh(scene, primitive, material);
    mesh.position.setXYZ((i - (count - 1) / 2) * 2.4, 0, 5 - i * gap);
    row.push(mesh);
  }
  return row;
}

/** Triangles drawn for a mesh at a level: level 0 is the primitive's own range, then `lods`. */
export function trianglesAt(primitive: Primitive, level: number): number {
  return (level === 0 ? primitive.indexCount : (primitive.lods[level - 1]?.indexCount ?? 0)) / 3;
}

/** One line per mesh: its distance to the camera, the level selectLod() picks and that level's triangles. */
export function lodReport(row: Mesh[], camera: Camera): string {
  return row
    .map((mesh, i) => {
      const level = mesh.selectLod(camera);
      const d = Vector3.distance(mesh.getWorldPosition(), camera.getWorldPosition());
      const prim = mesh.primitive!;
      return `mesh ${i}  distance ${d.toFixed(0).padStart(3)}  level ${level} of ${prim.lodCount}  triangles ${trianglesAt(prim, level)}`;
    })
    .join('\n');
}

/** A latitude/longitude unit sphere with (n+1) x (n+1) vertices: positions, normals (= positions) and UVs. */
export function gridSphere(n: number): { positions: Float32Array<ArrayBuffer>; normals: Float32Array<ArrayBuffer>; uvs: Float32Array<ArrayBuffer> } {
  const count = (n + 1) * (n + 1);
  const positions = new Float32Array(count * 3);
  const uvs = new Float32Array(count * 2);
  for (let j = 0; j <= n; j++) {
    for (let i = 0; i <= n; i++) {
      const lat = (j / n) * Math.PI;
      const lon = (i / n) * Math.PI * 2;
      const o = j * (n + 1) + i;
      positions.set([Math.sin(lat) * Math.cos(lon), Math.cos(lat), Math.sin(lat) * Math.sin(lon)], o * 3);
      uvs.set([i / n, j / n], o * 2);
    }
  }
  return { positions, normals: positions.slice(), uvs };
}

/** Triangle indices of the grid, taking every `stride`-th vertex: stride 1 is the full grid, 2 a quarter of its triangles. */
export function gridIndices(n: number, stride: number): number[] {
  const out: number[] = [];
  for (let j = 0; j < n; j += stride) {
    for (let i = 0; i < n; i += stride) {
      const a = j * (n + 1) + i;
      const b = a + stride;
      const c = a + stride * (n + 1);
      const d = c + stride;
      out.push(a, b, c, b, d, c);
    }
  }
  return out;
}
