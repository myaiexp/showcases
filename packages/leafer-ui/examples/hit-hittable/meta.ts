// leafer-ui example: Hit: hittable false stops an element reacting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hittable false stops an element reacting",
  summary: "hittable: false makes an element ignore the pointer like pointer-events: none, so it can no longer be dragged. The checkbox (or the card's script) switches it and tries a drag.",
  section: "Interaction",
  tags: ["hittable","draggable","Rect"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
