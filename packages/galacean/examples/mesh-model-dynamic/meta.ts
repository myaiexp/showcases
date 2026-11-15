// galacean example: ModelMesh: rewriting positions every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: rewriting positions every frame",
  summary:
    "A plane grid whose positions and normals are recomputed each frame into a travelling wave. uploadData(false) keeps the CPU copy so the same mesh can be updated again and again.",
  section: "Mesh",
  tags: ['ModelMesh', 'setPositions', 'setNormals', 'uploadData'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
