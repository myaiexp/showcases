// galacean example: PrimitiveMesh Cuboid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Cuboid",
  summary:
    "PrimitiveMesh.createCuboid with every parameter exposed (width, height and depth), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createCuboid', 'width', 'height', 'depth'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
