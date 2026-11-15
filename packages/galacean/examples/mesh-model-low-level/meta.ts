// galacean example: ModelMesh: low-level vertex buffer and read-back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: low-level vertex buffer and read-back",
  summary:
    "Instead of Vector3 arrays, a raw Float32Array goes into a readable Buffer bound with setVertexBufferBinding and described by a VertexElement; getPositions then reads the high-level data back, and the caption prints it.",
  section: "Mesh",
  tags: ['ModelMesh', 'Buffer', 'BufferBindFlag', 'VertexElement', 'VertexAttribute', 'getPositions'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
