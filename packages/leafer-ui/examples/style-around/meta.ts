// leafer-ui example: Around: draw around a point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Around: draw around a point",
  summary:
    "around places the element so that its own anchor sits at its (x, y), like a game engine anchor. The rect has x: 50, y: 50 and around: \"center\", so its centre lands in the middle of the red frame and it spins in place.",
  section: "Basics",
  tags: ['Rect', 'Frame', 'around', 'rotation'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/style.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
