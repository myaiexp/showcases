// style fill: red, style: { } and style circle { }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: style written three ways",
  summary: "A style declaration on an element adds to its style attribute: style fill: red for one property, style: { … } for several. And style circle { … } is short for a style block that holds a circle rule. All three color the same circle.",
  section: "SVG",
  tags: ["@svg","style"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
