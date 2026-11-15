// fill: linearGradient { ... } builds defs for you
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: a gradient as a value",
  summary: "A gradient can go directly in fill. css-doodle puts it in <defs>, gives it an id and makes the fill url(#id). The variants rotate it, make it radial, or spell out the defs prefix.",
  section: "SVG",
  tags: ["@svg","linearGradient","radialGradient","defs","stop"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md","repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
