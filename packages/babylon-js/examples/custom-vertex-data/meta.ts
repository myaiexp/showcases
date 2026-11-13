// babylon-js example: Custom mesh from VertexData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom mesh from VertexData",
  summary:
    "A rippling grid mesh made from raw positions, indices, normals and colours in a VertexData, with positions updated every frame.",
  section: 'Mesh',
  tags: ['VertexData', 'applyToMesh', 'ComputeNormals', 'updateVerticesData'],
  docs: [
    'repo/content/features/featuresDeepDive/mesh/creation/custom/custom.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
