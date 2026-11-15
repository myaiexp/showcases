// galacean example: PrimitiveMesh Capsule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Capsule",
  summary:
    "PrimitiveMesh.createCapsule with every parameter exposed (radius, the cylinder height and the segment counts), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createCapsule', 'radius', 'height', 'radialSegments', 'heightSegments'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
