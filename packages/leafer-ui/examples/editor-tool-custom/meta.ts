// leafer-ui example: EditTool: a custom edit tool with its own control point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: a custom edit tool with its own control point",
  summary: "A subclass of EditTool, registered under a unique tag and bound to a Rect class with setEditOuter, adds one extra control point to the edit box (the three steps of the docs: register, add control points, use).",
  section: 'Graphic editor',
  tags: ["EditTool", "registerEditTool", "setEditOuter", "onCreate", "onLoad", "onUpdate", "onUnload", "eventIds"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/register.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/load.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/use.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
