// @abs(@sin(@x / 2) * @cos(@y / 2)) as opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: sine and cosine in a grid",
  summary: "Every JavaScript Math function is available with an @ prefix. The product of a sine of the column and a cosine of the row, made positive by @abs, fades the cells into a checker of soft blobs. The variants change the divisors.",
  section: "Values",
  tags: ["@sin","@cos","@abs","opacity"],
  docs: ["pages/css-doodle-com/reference/function-math.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
