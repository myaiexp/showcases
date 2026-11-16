// leafer-ui example: Editor: getEditTool() returns the singleton tool instance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: getEditTool() returns the singleton tool instance",
  summary: "getEditTool(name) creates an edit tool once and returns the same instance afterwards; after a selection, editor.editTool is that same object. The docs read the line tool's config this way (it is undefined in 2.3.4 until set).",
  section: 'Graphic editor',
  tags: ["Editor", "getEditTool", "editTool", "LineEditTool", "EditTool"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/update.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
