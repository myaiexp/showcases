// galacean example: PrimitiveMesh Sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Sphere",
  summary:
    "PrimitiveMesh.createSphere with every parameter exposed (radius and segments), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createSphere', 'radius', 'segments'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
