// galacean example: ModelMesh: flat and smooth normals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: flat and smooth normals",
  summary:
    "The same cube built two ways: 24 vertices with one normal per face (flat shading) or 8 shared vertices whose normals point out from the centre (smooth, rounded look). setNormals decides the lighting.",
  section: "Mesh",
  tags: ['ModelMesh', 'setNormals', 'setPositions', 'setIndices'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
