// Two contours and fill-rule: evenodd cut a hole
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: contours and holes",
  summary: "With several contours, the shape is one path with a subpath for each. r: 1, .6 draws a circle of radius 1 and one of .6; under fill-rule: evenodd the inner one is a hole, while the default fill-rule fills it too.",
  section: "SVG",
  tags: ["@svg-polygon","fill-rule","evenodd","contours"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
