// leafer-ui example: Editor: setEditOuter() can take a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: setEditOuter() can take a function",
  summary: "Instead of a tool name, setEditOuter(fn) takes a function of the element: here a rect with a corner radius gets the red square-handled tool and a plain one gets the default EditTool.",
  section: 'Graphic editor',
  tags: ["setEditOuter", "EditTool", "editOuter", "editConfig"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/use.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
