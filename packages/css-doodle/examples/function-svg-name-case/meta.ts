// viewbox, LINEARGRADIENT and the usual spellings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: names are case-insensitive",
  summary: "Element and attribute names are case-insensitive and are written out in SVG spelling, so viewbox works like viewBox and lineargradient like linearGradient. All three variants draw the same gradient circle.",
  section: "SVG",
  tags: ["@svg","viewBox","linearGradient"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
