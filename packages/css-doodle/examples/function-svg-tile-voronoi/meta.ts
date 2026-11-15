// @tile.voronoi gives each path the next piece
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: voronoi pieces with a stroke",
  summary: "@tile gives each copy of an element the next piece of a tiling. The pieces are one image, so they can have a stroke, which a clip-path cannot: forty voronoi cells cut from a heart, each painted at random.",
  section: "SVG",
  tags: ["@svg","@tile","path*40","@p"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
