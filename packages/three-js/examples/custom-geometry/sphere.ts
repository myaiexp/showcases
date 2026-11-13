// Builds a sphere out of unshared quads as raw position/normal/uv arrays for a BufferGeometry
import * as THREE from 'three/webgpu';

export interface QuadSphere {
  geometry: THREE.BufferGeometry;
  /** Unit-sphere positions; they double as the normals and as the rest pose. */
  rest: Float32Array;
  position: THREE.BufferAttribute;
  segmentsAround: number;
}

/**
 * Each quad owns its own 4 vertices (nothing is shared between quads) so it can
 * move on its own. A vertex is position + normal + uv, kept in parallel arrays.
 */
export function makeQuadSphere(segmentsAround: number, segmentsDown: number): QuadSphere {
  const quads = segmentsAround * segmentsDown;
  const positions = new Float32Array(quads * 4 * 3);
  const uvs = new Float32Array(quads * 4 * 2);
  const indices: number[] = [];
  const p = new THREE.Vector3();
  const point = (lat: number, long: number): number[] =>
    p.set(Math.cos(lat) * Math.sin(long), Math.sin(lat), Math.cos(lat) * Math.cos(long)).toArray();

  let pos = 0;
  let uv = 0;
  let ndx = 0;
  for (let down = 0; down < segmentsDown; down++) {
    const v0 = down / segmentsDown;
    const v1 = (down + 1) / segmentsDown;
    for (let across = 0; across < segmentsAround; across++) {
      const u0 = across / segmentsAround;
      const u1 = (across + 1) / segmentsAround;
      const lat0 = (v0 - 0.5) * Math.PI;
      const lat1 = (v1 - 0.5) * Math.PI;
      const long0 = u0 * Math.PI * 2;
      const long1 = u1 * Math.PI * 2;
      const corners: [number, number, number, number][] = [
        [lat0, long0, u0, v0],
        [lat1, long0, u0, v1],
        [lat0, long1, u1, v0],
        [lat1, long1, u1, v1],
      ];
      for (const [lat, long, u, v] of corners) {
        positions.set(point(lat, long), pos);
        uvs.set([u, v], uv);
        pos += 3;
        uv += 2;
      }
      // Two triangles per quad, wound counter-clockwise seen from outside.
      indices.push(ndx, ndx + 2, ndx + 1, ndx + 1, ndx + 2, ndx + 3);
      ndx += 4;
    }
  }

  const rest = positions.slice();
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(positions, 3);
  // Hint that this attribute is rewritten often.
  position.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', position);
  // On a unit sphere the position is also the outward normal.
  geometry.setAttribute('normal', new THREE.BufferAttribute(rest.slice(), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return { geometry, rest, position, segmentsAround };
}
