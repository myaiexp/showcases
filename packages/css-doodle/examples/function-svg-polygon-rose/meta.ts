// fill paints the inside; r: cos(kt) draws a rose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: a fill and a rose curve",
  summary: "A fill paints the inside of the shape, empty by default. With points: 200 and r: cos(4t), the commands of @shape draw an eight-petal rose; a pink stroke on a black fill. The variants change the multiple of t.",
  section: "SVG",
  tags: ["@svg-polygon","points","r","fill","stroke"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
