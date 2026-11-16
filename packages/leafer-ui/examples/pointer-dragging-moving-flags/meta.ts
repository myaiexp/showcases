// leafer-ui example: PointerEvent: dragging and moving on move events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: dragging and moving on move events",
  summary: "A pointer.move event carries dragging (a drag is in progress) and moving (the viewport is being panned). A draggable rect and a viewport leafer report both flags while the fake pointer hovers, drags the rect, then pans the empty canvas.",
  section: "Events",
  tags: ["PointerEvent.MOVE", "dragging", "moving"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
