// leafer-ui example: DragEvent: setList to drag any element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragEvent: setList to drag any element",
  summary: "DragEvent.setList(leaf) makes elements follow the pointer even if they are not draggable. Pressing the blue bar sets the list to the green square, so dragging the bar moves the square.",
  section: "Events",
  tags: ["DragEvent.setList", "draggable", "PointerEvent.DOWN"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
