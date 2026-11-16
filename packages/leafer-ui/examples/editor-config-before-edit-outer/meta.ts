// leafer-ui example: Editor config: beforeEditOuter can refuse the edit tool
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeEditOuter can refuse the edit tool",
  summary: "beforeEditOuter gets { target, name } before an edit tool loads and returns false to skip it: the yellow rect is selected but gets no handles.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeEditOuter", "editTool", "EditTool"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
