// leafer-ui example: InnerEditor: getEditBoxPoint() and getEditTargetPoint()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "InnerEditor: getEditBoxPoint() and getEditTargetPoint()",
  summary: "An inner editor works in two coordinate systems: getEditBoxPoint() turns a point of the element into edit-box pixels (to place the red handle) and getEditTargetPoint() turns a pointer position back into element coordinates; the handle here sets the star's innerRadius.",
  section: 'Graphic editor',
  tags: ["InnerEditor", "getEditBoxPoint", "getEditTargetPoint", "innerRadius", "setEditInner"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/InnerEditor.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/editInner/load.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
