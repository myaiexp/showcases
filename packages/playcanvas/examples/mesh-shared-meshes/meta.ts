// playcanvas example: Shared meshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shared meshes",
  summary:
    "Four mesh instances with four materials share one wobbling mesh, so they all change together, while a fifth with its own mesh stays calm. The built-in box mesh is shared by every box primitive on the device, which the full view proves by editing it.",
  section: "Graphics: Meshes",
  tags: ["Mesh","MeshInstance","getPositions","shared meshes","RenderComponent.meshInstances"],
  docs: ["repo/docs/user-manual/graphics/meshes/index.md","repo/docs/user-manual/graphics/meshes/creating-meshes.md","repo/docs/user-manual/graphics/meshes/mesh-instances.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
