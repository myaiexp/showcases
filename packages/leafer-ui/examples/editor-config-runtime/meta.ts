// leafer-ui example: Editor: config changes at runtime need updateEditTool()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: config changes at runtime need updateEditTool()",
  summary: "Assigning to app.editor.config (stroke, pointSize, pointRadius) changes how the edit box draws once updateEditTool() runs.",
  section: 'Graphic editor',
  tags: ["Editor","config","updateEditTool","stroke","pointSize"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor.md","pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/update.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
