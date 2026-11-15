// @shape(star) as d, in a box from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: @shape gives path data",
  summary: "Inside @svg, @shape gives path data for d, in a box from -1 to 1 with y pointing down. viewBox: -1 -1 2 2 shows the whole shape, and five shrinking, rotating copies of it alternate black and pink.",
  section: "SVG",
  tags: ["@svg","@shape","path*5","@pn"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
