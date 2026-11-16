// leafer-ui example: DragEvent: moveWorld in a rotated view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragEvent: moveWorld in a rotated view",
  summary: "Drag events report movement in world coordinates; moveWorld(e.moveX, e.moveY) applies it correctly even when the leafer is rotated. A non-draggable rect is moved by a drag listener this way.",
  section: "Events",
  tags: ["DragEvent.DRAG", "moveWorld", "moveX", "moveY", "rotation"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
