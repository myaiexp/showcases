// leafer-ui example: Matrix: translate, scale, rotate in sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Matrix: translate, scale, rotate in sequence",
  summary: "A Matrix collects transforms; each call returns the Matrix so they chain. The square is drawn through new Matrix().translate().scale().rotate() and the six numbers a, b, c, d, e, f are printed. Reorder the chain to see the order matter.",
  section: "Utilities",
  tags: ["Matrix", "translate", "scale", "rotate", "get"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
