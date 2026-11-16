// leafer-ui example: DropEvent: drop an element into a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DropEvent: drop an element into a group",
  summary: "A drop target listens for DropEvent.DROP; e.list is what was dragged and e.data is whatever DragEvent.setData stored on enter. The dragged square is re-parented with dropTo() and the target outlines itself while a drag is over it.",
  section: "Events",
  tags: ["DropEvent.DROP", "DragEvent.setData", "DragEvent.ENTER", "dropTo", "list", "data"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drop.md", "pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
