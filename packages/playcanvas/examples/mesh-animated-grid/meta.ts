// playcanvas example: Updating a mesh every frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Updating a mesh every frame",
  summary:
    "A rippling grid whose heights change every frame: only the positions and normals are set again before update(), while the uvs and indices keep their data. The full view can skip recomputing the bounding box and change the cell count.",
  section: "Graphics: Meshes",
  tags: ["Mesh.update","setPositions","setNormals","calculateNormals","PRIMITIVE_TRIANGLES","bounding box"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
