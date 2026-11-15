// circle*N, *a-b, *NxM and *@ri() repeat forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: counts, ranges and grids",
  summary: "The number after * can be a count, a range such as 3-7, a grid such as 4x4 or a function such as @ri(3, 8). Inside the block @n is the step, and @nx and @ny the column and row of a grid.",
  section: "SVG",
  tags: ["@svg","circle*N","@n","@nx","@ny"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
