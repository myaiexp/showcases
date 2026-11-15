// Four circles each with a defs radialGradient fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: one gradient per copy",
  summary: "The grammar's own @svg example: four circles, each with a fill that is a radialGradient block. Every copy gets its own generated id and so its own gradient, and @n spaces the circles. The variants add a second stop.",
  section: "SVG",
  tags: ["@svg","circle*4","radialGradient","defs"],
  docs: ["repo/docs/grammar.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
