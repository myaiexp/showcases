// leafer-ui example: DragEvent: getPageBounds rubber band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragEvent: getPageBounds rubber band",
  summary: "e.getPageBounds() is the box between where the drag started and the pointer, in page coordinates. Dragging on empty canvas draws a selection rectangle from it, even after the view is zoomed.",
  section: "Events",
  tags: ["DragEvent.getPageBounds", "DragEvent.START", "DragEvent.DRAG", "DragEvent.END"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
