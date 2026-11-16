// leafer-ui example: Editor: unlock() makes locked elements editable again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: unlock() makes locked elements editable again",
  summary: "A locked, selected rect ignores a drag; after app.editor.unlock() the same drag moves it.",
  section: 'Graphic editor',
  tags: ["Editor","unlock","locked"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/lock.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
