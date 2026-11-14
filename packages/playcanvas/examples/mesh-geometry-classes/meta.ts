// playcanvas example: Geometry classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Geometry classes",
  summary:
    "All nine geometry classes (box, plane, sphere, capsule, cylinder, cone, torus, circle, dome) uploaded with Mesh.fromGeometry and rendered through MeshInstance. The full view re-subdivides every mesh and toggles the wireframe.",
  section: "Graphics: Meshes",
  tags: ["Mesh.fromGeometry","BoxGeometry","SphereGeometry","TorusGeometry","DomeGeometry","MeshInstance","renderStyle"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md","repo/docs/user-manual/graphics/meshes/mesh-instances.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
