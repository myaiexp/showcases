// @arc(r: 40 22; ...) is an elliptical arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: two radii draw an ellipse",
  summary: "r takes one radius or two. Two give an ellipse: 40 wide and 22 high, swept from 0 to 270 degrees around 50 50 with a thick stroke. The variants change the second radius and the sweep.",
  section: "SVG",
  tags: ["@arc","r","ellipse"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
