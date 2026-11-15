// galacean example: PrimitiveMesh Plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Plane",
  summary:
    "PrimitiveMesh.createPlane with every parameter exposed (width, height and horizontal and vertical segments), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createPlane', 'width', 'height', 'horizontalSegments', 'verticalSegments'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
