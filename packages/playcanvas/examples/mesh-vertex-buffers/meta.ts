// playcanvas example: Vertex and index buffers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Vertex and index buffers",
  summary:
    "A mesh built straight from a VertexFormat, a VertexBuffer with interleaved float positions and 8-bit colours, and an IndexBuffer. It sets the primitive description and the bounding box by hand, as the docs require when update() is not involved.",
  section: "Graphics: Meshes",
  tags: ["VertexFormat","VertexBuffer","IndexBuffer","SEMANTIC_COLOR","TYPE_UINT8","mesh.primitive","mesh.aabb","BoundingBox"],
  docs: ["repo/docs/user-manual/graphics/meshes/creating-meshes.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
