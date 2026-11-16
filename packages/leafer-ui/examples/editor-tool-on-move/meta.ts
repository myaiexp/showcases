// leafer-ui example: EditTool: overriding onMove to snap moves to a grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: overriding onMove to snap moves to a grid",
  summary: "The tool receives every EditorMoveEvent in onMove(); this one collects the movement and passes only whole 20 px steps to the default implementation, so the rect jumps from grid cell to grid cell.",
  section: 'Graphic editor',
  tags: ["EditTool", "onMove", "EditorMoveEvent", "setEditOuter"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/use.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
