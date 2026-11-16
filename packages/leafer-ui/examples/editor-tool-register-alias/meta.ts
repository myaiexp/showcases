// leafer-ui example: EditTool: registerEditTool() with an alias and changeTag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EditTool: registerEditTool() with an alias and changeTag",
  summary: "EditTool.registerEditTool(aliasName, changeTag) registers a tool class under another name; with changeTag true the tool's tag becomes that name too, as the readout shows after selecting the rect.",
  section: 'Graphic editor',
  tags: ["EditTool", "registerEditTool", "aliasName", "changeTag", "tag"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/EditTool.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editOuter/register.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
