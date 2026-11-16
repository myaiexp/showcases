// leafer-ui example: Bounds: collide two elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: collide two elements",
  summary:
    "Bounds.hit() compares two boxes. Using worldBoxBounds puts elements from different parents (one inside a Frame, one outside) in the same coordinates, so rect1 turns blue when rect2 touches it during a drag.",
  section: "Advanced",
  tags: ['Leafer', 'Bounds', 'hit', 'worldBoxBounds', 'DragEvent', 'Frame'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/bounds.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
