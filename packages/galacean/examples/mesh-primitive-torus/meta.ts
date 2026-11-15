// galacean example: PrimitiveMesh Torus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PrimitiveMesh Torus",
  summary:
    "PrimitiveMesh.createTorus with every parameter exposed (radius, tubeRadius, the segment counts and the arc), shown with a UV grid texture so the segments read. The card sweeps the parameters; the full view has a slider each.",
  section: "Mesh",
  tags: ['PrimitiveMesh', 'createTorus', 'radius', 'tubeRadius', 'radialSegments', 'tubularSegments', 'arc'],
  docs: [
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
