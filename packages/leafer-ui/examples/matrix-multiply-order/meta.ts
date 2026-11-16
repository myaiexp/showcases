// leafer-ui example: Matrix: multiply and multiplyParent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Matrix: multiply and multiplyParent",
  summary: "a.multiply(b) applies b inside a, a.multiplyParent(b) puts b outside a. The two products differ unless the transforms commute; the square drawn through each shows it.",
  section: "Utilities",
  tags: ["Matrix", "multiply", "multiplyParent", "clone"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/math/Matrix.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
