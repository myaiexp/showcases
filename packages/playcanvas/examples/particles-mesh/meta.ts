// playcanvas example: Particles drawn as meshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particles drawn as meshes",
  summary: "Instead of billboards, every particle can be a mesh: boxes, spheres or cones built from geometry, lit by the scene and spun by rotationSpeedGraph. The docs' model and render asset fields supply the mesh from an asset; here it is set directly.",
  section: "Components",
  tags: ["mesh","Mesh.fromGeometry","lighting","rotationSpeedGraph"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
