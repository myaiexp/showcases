// leafer-ui example: PointerEvent: down, move and up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PointerEvent: down, move and up",
  summary: "The basic pointer events fire in order: pointer.down, pointer.move while moving, pointer.up. The log shows each with its world position and which buttons are held; the card drives a fake pointer across and off the rect.",
  section: "Events",
  tags: ["PointerEvent.DOWN", "PointerEvent.MOVE", "PointerEvent.UP", "buttons"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Pointer.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
