// leafer-ui example: EditTool: overriding onScale to keep the aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: overriding onScale to keep the aspect ratio",
  summary: "onScale() gets every EditorScaleEvent; this tool replaces scaleY with scaleX before calling the default implementation, so even an edge handle resizes both axes together.",
  section: 'Graphic editor',
  tags: ["EditTool", "onScale", "EditorScaleEvent", "setEditOuter"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorScaleEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
