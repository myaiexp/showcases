// leafer-ui example: Matrix: setLayout and getLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Matrix: setLayout and getLayout",
  summary: "setLayout({ x, y, scaleX, scaleY, rotation, skewX, skewY }) builds a matrix from friendly numbers, and getLayout() reads them back (decomposes). A square is drawn through the matrix and the recovered values are printed.",
  section: "Utilities",
  tags: ["Matrix", "setLayout", "getLayout", "ILayoutData"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
