// leafer-ui example: Editor config: onCopy lets Alt-drag duplicate the selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: onCopy lets Alt-drag duplicate the selection",
  summary: "When Alt is held while dragging, onCopy runs; cloning the selected elements inside it and returning true makes the drag move the copies.",
  section: 'Graphic editor',
  tags: ["Editor", "onCopy", "clone", "altKey"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
