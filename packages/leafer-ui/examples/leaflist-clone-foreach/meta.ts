// leafer-ui example: LeafList: clone, forEach and update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LeafList: clone, forEach and update",
  summary: "clone() copies a list so edits to the copy leave the original alone, and forEach(fn) visits each element in order. The list of squares is cloned, the clone is shortened, and forEach tints each member of both lists.",
  section: "Utilities",
  tags: ["LeafList", "clone", "forEach", "remove", "destroy"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/list/LeafList.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
