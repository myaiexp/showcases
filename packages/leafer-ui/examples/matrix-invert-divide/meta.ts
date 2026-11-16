// leafer-ui example: Matrix: invert and divide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Matrix: invert and divide",
  summary: "invert() turns a matrix into its inverse so that m * inverse is the identity, and divide(child) undoes a multiply(child). A point goes through m, then through the inverse and lands where it started.",
  section: "Utilities",
  tags: ["Matrix", "invert", "divide", "multiply", "toOuterPoint", "toInnerPoint"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
