// leafer-ui example: RotateEvent: rotation and totalRotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "RotateEvent: rotation and totalRotation",
  summary: "Two-finger rotation (Safari trackpads, touch screens) fires rotate.start, rotate and rotate.end with rotation and totalRotation. Here interaction.rotate sends them and the listener turns the leafer around the event point.",
  section: "Events",
  tags: ["RotateEvent.START", "RotateEvent.ROTATE", "RotateEvent.END", "rotation", "totalRotation", "LeafHelper.rotateOfWorld"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Rotate.md", "pages/www-leaferjs-com/ui/en/reference/event/simulation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
