// leafer-ui example: Performance: thousands of interactive rects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Performance: thousands of interactive rects",
  summary:
    "The performance page builds a million draggable rects in groups; this scaled-down grid builds as many groups of 400 as the slider says and prints how long creation took. Everything stays draggable.",
  section: "Basics",
  tags: ['Leafer', 'Group', 'Rect', 'draggable'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/performance.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
