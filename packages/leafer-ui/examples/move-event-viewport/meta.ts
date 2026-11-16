// leafer-ui example: MoveEvent: moveType and totals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MoveEvent: moveType and totals",
  summary: "A wheel turn or two-finger swipe fires move.start, move and move.end with moveX, moveY, totalX, totalY and moveType ('move' for the wheel, 'drag' when panning by dragging). The listener pans the leafer with moveWorld.",
  section: "Events",
  tags: ["MoveEvent.START", "MoveEvent.MOVE", "MoveEvent.END", "moveType", "totalY", "moveWorld"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Move.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
