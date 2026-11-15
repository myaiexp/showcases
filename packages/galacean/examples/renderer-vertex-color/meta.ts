// galacean example: Vertex colours on a primitive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Vertex colours on a primitive",
  summary:
    "enableVertexColor makes the mesh renderer multiply the mesh's per-vertex colours into the material. A built-in sphere is given colours from its own vertex positions with setColors, then the flag toggles.",
  section: "Renderer",
  tags: ['MeshRenderer.enableVertexColor', 'ModelMesh.setColors', 'getPositions'],
  docs: [
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
