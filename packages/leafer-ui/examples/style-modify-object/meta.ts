// leafer-ui example: Style: object values need reassigning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Style: object values need reassigning",
  summary:
    "An element only notices first-level setters. rect.fill = { type: \"image\", url } redraws, but rect.fill.url = url on the existing object does not. The buttons try both; the card reassigns the whole object.",
  section: "Basics",
  tags: ['Rect', 'fill', 'image'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/style.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
