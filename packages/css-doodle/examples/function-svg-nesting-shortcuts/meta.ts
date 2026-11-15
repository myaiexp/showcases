// g circle, g > circle and circle, rect share attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: nesting and grouping shortcuts",
  summary: "A circle inside a group can be written as nested blocks, as g circle or as g > circle, and several elements with the same attributes go in one block separated by commas. The first three variants draw the same group; the last shares the fill between a circle and a rect.",
  section: "SVG",
  tags: ["@svg","g","selector","circle, rect"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
