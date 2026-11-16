// leafer-ui example: Editor config: an inner editor's own settings keyed by its tag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: an inner editor's own settings keyed by its tag",
  summary: "The editor config can carry one object per inner editor; key TextEditor with selectAll false opens the text without selecting it, and mergeConfig reads it back.",
  section: 'Graphic editor',
  tags: ["Editor","mergeConfig","TextEditor","selectAll"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/innerEditor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
