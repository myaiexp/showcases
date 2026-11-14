// playcanvas example: Camera stacking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera stacking",
  summary:
    "A main camera, a full-screen overlay camera that keeps the main image by not clearing colour, and a picture-in-picture minimap with its own background, ordered by priority. The full view toggles the overlay's clear flags and the minimap.",
  section: "Graphics: Cameras",
  tags: ["priority","clearColorBuffer","clearDepthBuffer","rect","layers"],
  docs: ["repo/docs/user-manual/graphics/cameras/multiple-cameras.md","repo/docs/user-manual/graphics/cameras/clearing.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
