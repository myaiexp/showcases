// galacean example: MeshRenderer: mesh and material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MeshRenderer: mesh and material",
  summary:
    "The docs' usage code: an entity gets a MeshRenderer, its mesh is a cuboid and setMaterial attaches a BlinnPhongMaterial. A second renderer shows the same mesh with another material.",
  section: "Renderer",
  tags: ['MeshRenderer', 'PrimitiveMesh', 'setMaterial', 'BlinnPhongMaterial'],
  docs: [
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
    'repo/docs/en/graphics/mesh/primitiveMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
