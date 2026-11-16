// leafer-ui example: Editor: dimTarget limits where dimOthers fades
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: dimTarget limits where dimOthers fades",
  summary: "dimOthers fades every other element in the selected element's layer; dimTarget narrows that to one Group (or an array of Groups): here only the left group's other rects fade.",
  section: 'Graphic editor',
  tags: ["Editor", "dimTarget", "dimOthers", "targetLeafer", "Group", "@leafer-in/bright"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/config/style.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
