// leafer-ui example: Editor config: beforeEditInner can refuse the inner editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeEditInner can refuse the inner editor",
  summary: "beforeEditInner gets { target, name } before an inner editor opens and returns false to stop it; double-clicking the text then does nothing.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeEditInner", "innerEditing", "Text"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
