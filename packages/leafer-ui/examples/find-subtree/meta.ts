// leafer-ui example: find: search one branch only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "find: search one branch only",
  summary: "find() on a Group only looks at that group's subtree, while leafer.find() sees everything. Two groups hold squares of the same className; the select picks where the search starts.",
  section: "Element advanced",
  tags: ["find", "className", "Group"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/find.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
