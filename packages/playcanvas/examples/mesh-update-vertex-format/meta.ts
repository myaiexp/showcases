// playcanvas example: Changing the vertex format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Changing the vertex format",
  summary:
    "A torus gains and loses a colour stream: clear() discards the vertex format, every stream is set again, and the mesh is assigned to its mesh instance once more so the shaders match. Cards flip the format on a timer.",
  section: "Graphics: Meshes",
  tags: ["Mesh.clear","getPositions","setColors32","MeshInstance.mesh","diffuseVertexColor"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md","repo/docs/user-manual/graphics/meshes/mesh-instances.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
