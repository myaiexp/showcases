// leafer-ui example: Events: one listener for several types (array form)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: one listener for several types (array form)",
  summary: "on() takes an array of event names and one listener, which tells them apart by e.type. Enter and leave share a handler that recolours the rect and logs the type.",
  section: "Interaction",
  tags: ["on","PointerEvent","array","Rect"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/on.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/emit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
