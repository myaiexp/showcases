// @arc(...) M @arc(...) draws two pieces
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: two separate arcs in one path",
  summary: "The data ends at the arc's end, and the leading L of an arc after a bare M becomes an M, so @arc(…) M @arc(…) is two separate arcs in a single path d. Here a pair of brackets around the middle.",
  section: "SVG",
  tags: ["@arc","M","path"],
  docs: ["pages/css-doodle-com/reference/function-arc.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
