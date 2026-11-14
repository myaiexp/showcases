// playcanvas example: Perspective, orthographic and aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Perspective, orthographic and aspect ratio",
  summary:
    "The same row of boxes under both projection types: perspective shrinks them with distance, orthographic keeps their size and is set by orthoHeight. Cards flip between the two by themselves; the full view adds fov, horizontalFov and the manual aspect ratio mode.",
  section: "Graphics: Cameras",
  tags: ["projection","PROJECTION_ORTHOGRAPHIC","fov","horizontalFov","orthoHeight","aspectRatioMode","ASPECT_MANUAL","aspectRatio"],
  docs: ["repo/docs/user-manual/graphics/cameras/projection.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
