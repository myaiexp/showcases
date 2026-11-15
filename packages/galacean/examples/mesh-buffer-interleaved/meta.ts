// galacean example: BufferMesh: interleaved vertex buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BufferMesh: interleaved vertex buffer",
  summary:
    "The docs' interleaved case: one vertex buffer holds POSITION (3 floats) then COLOR (4 normalised bytes) for every vertex, a 16-byte stride, described by two VertexElements. A hexagon of 18 vertices, no indices.",
  section: "Mesh",
  tags: ['BufferMesh', 'Buffer', 'BufferBindFlag.VertexBuffer', 'VertexElement', 'VertexElementFormat', 'setVertexBufferBinding'],
  docs: [
    'repo/docs/en/graphics/mesh/bufferMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
