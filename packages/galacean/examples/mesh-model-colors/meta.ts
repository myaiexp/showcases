// galacean example: ModelMesh: vertex colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ModelMesh: vertex colours",
  summary:
    "setColors gives a ModelMesh one Color per vertex, and the mesh renderer's enableVertexColor multiplies them into the material. A hexagonal fan is coloured round the hue wheel; the card toggles the flag.",
  section: "Mesh",
  tags: ['ModelMesh', 'setColors', 'MeshRenderer.enableVertexColor', 'Color'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
