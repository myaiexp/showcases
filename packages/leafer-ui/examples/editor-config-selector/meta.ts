// leafer-ui example: Editor config: selector false stops click selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: selector false stops click selection",
  summary: "selector false turns off the selection handler: clicking or box-selecting no longer selects, though app.editor.select() still does.",
  section: 'Graphic editor',
  tags: ["Editor", "selector", "select"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/select.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
