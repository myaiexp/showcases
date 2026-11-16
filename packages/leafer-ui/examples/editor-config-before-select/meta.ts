// leafer-ui example: Editor config: beforeSelect can cancel a selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeSelect can cancel a selection",
  summary: "The beforeSelect hook gets { target } and returns false to refuse: here the yellow rect can never be selected, the orange one can.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeSelect", "select"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
