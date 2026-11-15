// galacean example: PrimitiveMesh Cone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Cone",
  summary:
    "PrimitiveMesh.createCone with every parameter exposed (radius, height and radial and height segments), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createCone', 'radius', 'height', 'radialSegments', 'heightSegments'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
