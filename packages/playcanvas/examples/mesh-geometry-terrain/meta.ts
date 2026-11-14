// playcanvas example: Displaced plane terrain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Displaced plane terrain",
  summary:
    "A subdivided PlaneGeometry has its positions array displaced, normals recalculated with calculateNormals, and the result uploaded as a mesh. Sliders change the segment count, frequency and height, rebuilding the mesh.",
  section: "Graphics: Meshes",
  tags: ["PlaneGeometry","Geometry.positions","calculateNormals","Mesh.fromGeometry"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
