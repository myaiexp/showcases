// leafer-ui example: LeaferEvent: transform, move, scale, rotate, skew
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LeaferEvent: transform, move, scale, rotate, skew",
  summary: "A viewport Leafer reports changes to its own view: leafer.move for x and y, leafer.scale, leafer.rotate, leafer.skew, and leafer.transform for any of them. Each step edits one view property and the log names the events.",
  section: "Events",
  tags: ["LeaferEvent.TRANSFORM", "LeaferEvent.MOVE", "LeaferEvent.SCALE", "LeaferEvent.ROTATE", "LeaferEvent.SKEW"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Leafer.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
