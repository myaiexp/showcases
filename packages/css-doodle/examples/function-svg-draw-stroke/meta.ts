// draw: 3s infinite strokes a path along its length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: draw a stroke over time",
  summary: "draw: 3s infinite draws the stroke of a shape over three seconds and repeats. The path is a zigzag made of @M10.pn steps, and a stroke has to be set to see it. It works on paths, lines, circles, ellipses, rectangles, polygons and polylines.",
  section: "SVG",
  tags: ["@svg","draw","path","@M","@pn"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
