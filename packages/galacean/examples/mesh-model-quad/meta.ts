// galacean example: ModelMesh: positions, sub-mesh and upload
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: positions, sub-mesh and upload",
  summary:
    "The docs' first ModelMesh recipe: six Vector3 positions make two triangles, addSubMesh(0, 6) says how many vertices to draw and uploadData(false) sends them to the GPU. Unlit, so only the shape shows.",
  section: "Mesh",
  tags: ['ModelMesh', 'setPositions', 'addSubMesh', 'uploadData', 'UnlitMaterial'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
    'repo/docs/en/graphics/mesh/mesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
