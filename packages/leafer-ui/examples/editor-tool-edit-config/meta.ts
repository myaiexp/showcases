// leafer-ui example: EditTool: editConfig restyles the editor while the tool is open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: editConfig restyles the editor while the tool is open",
  summary: "A tool can set editConfig, a temporary editor configuration that overrides the main one only while the tool is loaded: the left rect (red tool) gets red square handles and middle points, the right one the normal edit box.",
  section: 'Graphic editor',
  tags: ["EditTool", "editConfig", "setEditOuter", "mergeConfig"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
