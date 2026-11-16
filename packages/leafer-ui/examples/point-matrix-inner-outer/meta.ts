// leafer-ui example: Point: toInnerOf and toOuterOf
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point: toInnerOf and toOuterOf",
  summary: "toOuterOf(matrix) maps a point from a matrix's inner space to its outer space and toInnerOf(matrix) maps it back. The grey square goes through a matrix (scale, rotate, move) to the blue one; the point travels out and back.",
  section: "Utilities",
  tags: ["Point", "toOuterOf", "toInnerOf", "Matrix"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Point.md", "pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
