// stroke, stroke-width, fill and padding of a shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: stroke, fill and padding",
  summary: "stroke is the outline color (black by default, since a background image does not inherit color), stroke-width is in the shape's -1 to 1 space, fill defaults to none and padding is the space around the shape, half the stroke width by default. A thick stroke with padding: 0 is cut off at the edge; more padding leaves it room.",
  section: "SVG",
  tags: ["@svg-polygon","stroke","stroke-width","fill","padding"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
