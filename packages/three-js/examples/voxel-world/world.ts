// VoxelWorld: one 32x32x32 chunk of terrain whose geometry holds only the exposed faces
import * as THREE from 'three/webgpu';

export const CELL = 32;

// Each face: the neighbour direction to test, and its four corners (from the manual).
const FACES = [
  { dir: [-1, 0, 0], corners: [[0, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 1]] }, // left
  { dir: [1, 0, 0], corners: [[1, 1, 1], [1, 0, 1], [1, 1, 0], [1, 0, 0]] }, // right
  { dir: [0, -1, 0], corners: [[1, 0, 1], [0, 0, 1], [1, 0, 0], [0, 0, 0]] }, // bottom
  { dir: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0]] }, // top
  { dir: [0, 0, -1], corners: [[1, 0, 0], [0, 0, 0], [1, 1, 0], [0, 1, 0]] }, // back
  { dir: [0, 0, 1], corners: [[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]] }, // front
] as const;

export interface Stats {
  voxels: number;
  faces: number;
  naiveFaces: number;
}

export class VoxelWorld {
  readonly cell = new Uint8Array(CELL * CELL * CELL);

  /** Fill the chunk with rolling hills: everything below the surface is solid. */
  generate(frequency: number): void {
    this.cell.fill(0);
    for (let z = 0; z < CELL; z++) {
      for (let x = 0; x < CELL; x++) {
        const height =
          12 + Math.sin((x / CELL) * Math.PI * 2 * frequency) * 5 + Math.sin((z / CELL) * Math.PI * 3 * frequency) * 4;
        for (let y = 0; y < CELL && y <= height; y++) this.setVoxel(x, y, z, 1);
      }
    }
  }

  private offset(x: number, y: number, z: number): number {
    return y * CELL * CELL + z * CELL + x;
  }

  setVoxel(x: number, y: number, z: number, v: number): void {
    this.cell[this.offset(x, y, z)] = v;
  }

  // Anything outside the chunk counts as empty, so the chunk's outer faces are emitted.
  getVoxel(x: number, y: number, z: number): number {
    if (x < 0 || y < 0 || z < 0 || x >= CELL || y >= CELL || z >= CELL) return 0;
    return this.cell[this.offset(x, y, z)] ?? 0;
  }

  /** Build one BufferGeometry. With cull = false every face of every voxel is emitted. */
  buildGeometry(cull: boolean): { geometry: THREE.BufferGeometry; stats: Stats } {
    const positions: number[] = [];
    const normals: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    const color = new THREE.Color();
    let voxels = 0;

    for (let y = 0; y < CELL; y++) {
      for (let z = 0; z < CELL; z++) {
        for (let x = 0; x < CELL; x++) {
          if (!this.getVoxel(x, y, z)) continue;
          voxels++;
          const topExposed = !this.getVoxel(x, y + 1, z);
          for (const { dir, corners } of FACES) {
            // A face is only needed when there is no neighbouring voxel in its direction.
            if (cull && this.getVoxel(x + dir[0], y + dir[1], z + dir[2])) continue;
            const ndx = positions.length / 3;
            // Grass on the surface, soil on the sides, stone deeper down.
            if (dir[1] === 1 && topExposed) color.setHSL(0.3, 0.55, 0.3 + y / 80);
            else if (y > 6) color.setHSL(0.08, 0.4, 0.3);
            else color.setHSL(0, 0, 0.45);
            for (const c of corners) {
              positions.push(c[0] + x, c[1] + y, c[2] + z);
              normals.push(...dir);
              colors.push(color.r, color.g, color.b);
            }
            indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geometry.setIndex(indices);
    return { geometry, stats: { voxels, faces: indices.length / 6, naiveFaces: voxels * 6 } };
  }
}
