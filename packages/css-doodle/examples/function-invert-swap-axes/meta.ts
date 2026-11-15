// @invert reflects path data along the diagonal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Invert: swap x and y of a path",
  summary: "Pink is `M 2 2 h 3 v 3 h 3 v -3`, black is @invert of it: h becomes v and back, with the same lengths. @p(--path) stores the path and @invert.p reuses that pick. The variants try other paths.",
  section: "SVG",
  tags: ["@invert","@p","@svg","path"],
  docs: ["pages/css-doodle-com/reference/function-invert.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
