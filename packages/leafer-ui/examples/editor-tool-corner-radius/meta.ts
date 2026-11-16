// leafer-ui example: EditTool: a control point that edits the corner radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: a control point that edits the corner radius",
  summary: "The docs describe control points for the shape of an element; this tool adds a red handle just inside the top edge of a rect whose horizontal position is its cornerRadius, so dragging it rounds the corners.",
  section: 'Graphic editor',
  tags: ["EditTool", "getPointStyle", "cornerRadius", "DragEvent", "getInnerPoint", "setEditOuter"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/EditBox.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/load.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
