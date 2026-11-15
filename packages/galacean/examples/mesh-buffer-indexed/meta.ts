// galacean example: BufferMesh: index buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BufferMesh: index buffer",
  summary:
    "The interleaved hexagon again, now with an index buffer: 7 vertices instead of 18, and 18 UInt16 indices reuse them. The sub-mesh counts indices, not vertices.",
  section: "Mesh",
  tags: ['BufferMesh', 'BufferBindFlag.IndexBuffer', 'IndexFormat', 'setIndexBufferBinding'],
  docs: [
    'repo/docs/en/graphics/mesh/bufferMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
