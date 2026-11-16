// leafer-ui example: EditorEvent: SELECT fires on every select and deselect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditorEvent: SELECT fires on every select and deselect",
  summary: "app.editor.on(EditorEvent.SELECT, ...) runs whenever the selection changes, including when it is cleared; e.editor.list is the new selection.",
  section: 'Graphic editor',
  tags: ["EditorEvent", "EditorEvent.SELECT", "on", "list"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorEvent.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/Event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
