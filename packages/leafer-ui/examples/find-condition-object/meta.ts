// leafer-ui example: find: id, className and tag objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "find: id, className and tag objects",
  summary: "Besides strings, find() accepts condition objects: { id }, { className } and { tag } where tag can be a list. Pick a condition to see which of the mixed shapes it matches.",
  section: "Element advanced",
  tags: ["find", "findOne", "className", "tag", "id"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/find.md", "pages/www-leaferjs-com/ui/en/reference/UI/findOne.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
