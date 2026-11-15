// galacean example: BufferMesh: GPU instancing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BufferMesh: GPU instancing",
  summary:
    "A second vertex buffer holds per-instance data (INSTANCE_OFFSET and INSTANCE_ROTATION) read with an instance step rate of 1, and instanceCount draws 144 copies of one coloured cube in a single call.",
  section: "Mesh",
  tags: ['BufferMesh', 'instanceCount', 'VertexElement', 'instanceStepRate', 'Buffer.setData'],
  docs: [
    'repo/docs/en/graphics/mesh/bufferMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
