// Names starting with draw or animate go to the shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: draw and other copied names",
  summary: "Names starting with stroke, fill, clip, marker, mask, animate or draw are copied to the shape as in @svg, so draw: 3s infinite traces the outline of a star over time. Others such as opacity are dropped.",
  section: "SVG",
  tags: ["@svg-polygon","draw","animate"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
