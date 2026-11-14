// playcanvas example: Frustum containsPoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Frustum containsPoint",
  summary:
    "A scout camera turns on the spot while a top-down overview colours every cube green when the scout's read-only frustum contains its position. The cone edges are drawn as lines, and the scout's own view sits in a picture-in-picture corner; the full view changes its fov and far clip.",
  section: "Graphics: Cameras",
  tags: ["frustum","Frustum.containsPoint","rect","priority","drawLine"],
  docs: ["repo/docs/user-manual/graphics/cameras/projection.md","repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
