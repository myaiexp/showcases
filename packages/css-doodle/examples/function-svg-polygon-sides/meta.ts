// @svg-polygon(points: N) draws regular polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: a stroked shape per cell",
  summary: "@svg-polygon makes an SVG image from the same commands as @shape. points: @pn(3, 4, 5 … 12) gives each of nine cells a polygon with that many sides, and a stroke-width in the -1 to 1 space of the shape outlines it, which a clip-path cannot. Each cell turns slowly.",
  section: "SVG",
  tags: ["@svg-polygon","points","stroke-width","@pn"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
