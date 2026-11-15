// galacean example: ModelMesh: UVs and indices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: UVs and indices",
  summary:
    "Four vertices, four Vector2 UVs and six indices make a textured quad, as in the docs' high-level data example. The card keeps rewriting the UVs (zoom and spin), and uploadData(false) pushes each change.",
  section: "Mesh",
  tags: ['ModelMesh', 'setPositions', 'setUVs', 'setIndices', 'Vector2'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
