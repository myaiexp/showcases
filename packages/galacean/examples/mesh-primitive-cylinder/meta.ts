// galacean example: PrimitiveMesh Cylinder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Cylinder",
  summary:
    "PrimitiveMesh.createCylinder with every parameter exposed (radiusTop, radiusBottom, height and the radial and height segments), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createCylinder', 'radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
