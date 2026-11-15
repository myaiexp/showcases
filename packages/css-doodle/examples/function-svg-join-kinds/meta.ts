// Four ways to join two overlapping circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: union, subtract, intersect, exclude",
  summary: "Two overlapping circles go into each of the four joining blocks. union covers both, subtract takes the second from the first, intersect keeps the lens where they overlap, and exclude keeps what an odd number of shapes cover.",
  section: "SVG",
  tags: ["@svg","union","subtract","intersect","exclude"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
