// leafer-ui example: Editor config: beforeSelect can swap the selected element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeSelect can swap the selected element",
  summary: "Returning an element from beforeSelect replaces the selection data: clicking the orange rect selects the yellow one instead.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeSelect", "select"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
