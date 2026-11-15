// --i: @n; r: $(i * 2) inside a repeat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: variables set in each copy",
  summary: "A custom property is set where it stands, again in each copy of a * repeat, so circle*3 { --i: @n; r: $(i * 2) } gives radii 2, 4 and 6. --c, fill: @p(…) sets the variable and the attribute to one value picked once, which a later declaration reads as $c.",
  section: "SVG",
  tags: ["@svg","--name","$()","circle*3","@p"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
