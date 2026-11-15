// galacean example: One material per sub-mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One material per sub-mesh",
  summary:
    "A cuboid's 36 indices cut into six sub-meshes, one per face, and setMaterial(index, material) gives each face its own colour. The card swaps one face's material in turn; materialCount and getMaterials read them back.",
  section: "Renderer",
  tags: ['MeshRenderer', 'setMaterial', 'materialCount', 'getMaterials', 'Mesh.addSubMesh'],
  docs: [
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
