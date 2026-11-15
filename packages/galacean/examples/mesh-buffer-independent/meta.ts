// galacean example: BufferMesh: independent vertex buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BufferMesh: independent vertex buffers",
  summary:
    "One VertexElement per buffer: positions sit in a static buffer while a separate dynamic colour buffer is rewritten every frame with setData, so only the colours travel to the GPU.",
  section: "Mesh",
  tags: ['BufferMesh', 'Buffer.setData', 'BufferUsage.Dynamic', 'VertexBufferBinding', 'setVertexBufferBindings'],
  docs: [
    'repo/docs/en/graphics/mesh/bufferMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
