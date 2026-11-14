// playcanvas example: Render style and visibility
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render style and visibility",
  summary:
    "Three mesh instances of one torus mesh drawn solid, as a wireframe and as points; renderStyle belongs to the mesh instance, not to the mesh. Cards rotate the styles; the full view picks them and toggles visible.",
  section: "Graphics: Meshes",
  tags: ["renderStyle","RENDERSTYLE_WIREFRAME","RENDERSTYLE_POINTS","visible","MeshInstance"],
  docs: ["repo/docs/user-manual/graphics/meshes/mesh-instances.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
