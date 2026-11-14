// playcanvas example: Split screen with viewports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Split screen with viewports",
  summary:
    "Each camera draws into its own normalized rect of the canvas, in priority order, and chases one of four runners. Horizontal, vertical and four-way layouts switch by enabling cameras and rewriting their rects.",
  section: "Graphics: Cameras",
  tags: ["rect","priority","Vec4"],
  docs: ["repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
