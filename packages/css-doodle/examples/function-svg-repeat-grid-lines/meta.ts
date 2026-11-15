// line*16x16 with @nx, @ny and a random direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: lines on a 16 × 16 repeat",
  summary: "The repeat count can be a grid: line*16x16 makes 256 lines, and @nx and @ny give each its column and row. @p picks one of three directions per line, and padding .2 on the viewBox keeps the round caps from being clipped.",
  section: "SVG",
  tags: ["@svg","line*NxN","@nx","@ny","@p","padding"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
