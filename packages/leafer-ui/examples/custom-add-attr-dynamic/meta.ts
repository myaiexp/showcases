// leafer-ui example: Custom: addAttr with a computed default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: addAttr with a computed default",
  summary: "addAttr(name, fn) adds an attribute whose default is computed from the element: float is 'center' when the text is 200 wide and 'left' otherwise. An explicit value overrides it.",
  section: "Element advanced",
  tags: ["addAttr", "Text", "dataType", "defaultValue function"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/custom/addAttr.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
