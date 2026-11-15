// @svg-polygon(star; scale: .9; …) adds to a preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG polygon: presets with extra commands",
  summary: "Commands after a preset name add to it, as in @shape. Each of nine cells draws a star, a heart or a hexagon at random, scaled a little down so the stroke fits, with a pink or yellow fill.",
  section: "SVG",
  tags: ["@svg-polygon","@p","star","heart","hexagon"],
  docs: ["pages/css-doodle-com/reference/function-svg-polygon.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
