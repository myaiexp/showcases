// leafer-ui example: EditTool: overriding onRotate to turn in fixed steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: overriding onRotate to turn in fixed steps",
  summary: "onRotate() gets every EditorRotateEvent; this tool accumulates the angle and rotates the element only in whole 30 degree steps.",
  section: 'Graphic editor',
  tags: ["EditTool", "onRotate", "EditorRotateEvent", "setEditOuter"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorRotateEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
