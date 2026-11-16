// leafer-ui example: Bounds: getFitMatrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: getFitMatrix",
  summary: "thumbBox.getFitMatrix(region, baseScale) returns the matrix that scales a content region down to fit inside the box (never above baseScale) and moves its corner to the origin. A star drawn in a large region is shrunk into a thumbnail box whose width the slider sets.",
  section: "Utilities",
  tags: ["Bounds", "getFitMatrix", "getFitScale", "Matrix", "toOuterOf"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Bounds.md", "pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
