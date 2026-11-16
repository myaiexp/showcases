// leafer-ui example: PointerEvent: enter and leave versus over and out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: enter and leave versus over and out",
  summary: "enter and leave ignore movement between a parent and its children, while over and out fire for every element boundary crossed. A group with a child shows both families as the pointer crosses them.",
  section: "Events",
  tags: ["PointerEvent.ENTER", "PointerEvent.LEAVE", "PointerEvent.OVER", "PointerEvent.OUT"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
