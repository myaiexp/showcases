// leafer-ui example: DragEvent: start, drag and end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragEvent: start, drag and end",
  summary: "drag.start fires once the pointer moves past the drag distance, drag repeatedly while it moves, and drag.end on release. The log shows each with its per-event and total movement.",
  section: "Events",
  tags: ["DragEvent.START", "DragEvent.DRAG", "DragEvent.END", "moveX", "totalX"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
