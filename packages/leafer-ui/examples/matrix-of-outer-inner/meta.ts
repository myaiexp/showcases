// leafer-ui example: Matrix: rotateOfOuter versus rotateOfInner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Matrix: rotateOfOuter versus rotateOfInner",
  summary: "rotateOfOuter(origin, deg) turns about a point in the outer space, rotateOfInner(origin, deg) about a point in the matrix's own (inner) space. Starting from the same moved matrix, the two turn the square about different places.",
  section: "Utilities",
  tags: ["Matrix", "rotateOfOuter", "rotateOfInner", "scaleOfOuter", "scaleOfInner"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
