// A mesh built from raw positions, indices, normals and colours in a VertexData, then updated live
import { ArcRotateCamera, HemisphericLight, Mesh, StandardMaterial, Vector3, VertexBuffer, VertexData } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 14, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, -0.5), scene);

  // A grid of N x N vertices: positions are x,y,z triples, indices are triples of vertex numbers.
  const n = ctx.preview ? 20 : 36;
  const size = 10;
  const positions: number[] = [];
  const colors: number[] = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      positions.push((i / (n - 1) - 0.5) * size, 0, (j / (n - 1) - 0.5) * size);
      colors.push(i / (n - 1), 0.5, 1 - j / (n - 1), 1);
    }
  }
  const indices: number[] = [];
  for (let j = 0; j < n - 1; j++) {
    for (let i = 0; i < n - 1; i++) {
      const a = j * n + i;
      const b = a + 1;
      const c = a + n;
      const d = c + 1;
      // clockwise seen from above (+y), so the front face points up
      indices.push(a, c, b, b, c, d);
    }
  }
  const normals: number[] = [];
  VertexData.ComputeNormals(positions, indices, normals);

  const mesh = new Mesh('custom', scene);
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.colors = colors;
  // true: keep the vertex buffers updatable so we can rewrite positions every frame.
  vertexData.applyToMesh(mesh, true);

  const material = new StandardMaterial('material', scene);
  material.backFaceCulling = false;
  mesh.material = material;

  stage.run(() => {
    const t = performance.now() / 600;
    for (let k = 0; k < positions.length; k += 3) {
      const x = positions[k]!;
      const z = positions[k + 2]!;
      positions[k + 1] = Math.sin(x * 0.9 + t) * Math.cos(z * 0.9 - t * 0.8) * 0.9;
    }
    VertexData.ComputeNormals(positions, indices, normals);
    mesh.updateVerticesData(VertexBuffer.PositionKind, positions);
    mesh.updateVerticesData(VertexBuffer.NormalKind, normals);
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => stage.dispose();
};

export default mount;
