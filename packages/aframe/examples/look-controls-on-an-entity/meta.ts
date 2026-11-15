// aframe example: look-controls: rotating an entity that is not the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "look-controls: rotating an entity that is not the camera",
  summary: "look-controls rotates whatever entity it is on, not only cameras: attached to a box, dragging the mouse turns the box. The camera here is fixed with look-controls disabled, so the only thing that responds to the drag is the box with its own look-controls.",
  section: 'Components',
  tags: ["look-controls", "rotation", "mouse drag", "entity", "camera"],
  docs: ["repo/docs/components/look-controls.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
