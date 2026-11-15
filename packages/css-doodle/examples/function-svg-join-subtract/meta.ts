// subtract { } cuts holes, smooth rounds the joins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: subtract and smooth",
  summary: "A subtract block takes every shape after the first away from the first, then makes one path with the block's attributes. smooth: r rounds the corners where shapes meet. Variants turn the rounding from none to strong.",
  section: "SVG",
  tags: ["@svg","subtract","smooth","circle*8","@Plot"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
