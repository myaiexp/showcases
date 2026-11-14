// playcanvas example: Mesh from vertex streams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mesh from vertex streams",
  summary:
    "A gem built from nothing but arrays: setPositions, setNormals via calculateNormals, setUvs, setColors32 and setIndices, then update(). The full view toggles the vertex colours and the texture coordinates through the material.",
  section: "Graphics: Meshes",
  tags: ["Mesh","setPositions","setNormals","setUvs","setColors32","setIndices","calculateNormals","diffuseVertexColor"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
