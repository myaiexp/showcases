// --dots(): circle*9 { } called as $dots()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: a function defined inside @svg",
  summary: "A function defined inside the @svg is seen only there, and its body can hold elements and * repeats. $dots() inserts nine circles, and calling it twice with different arguments draws two sets.",
  section: "SVG",
  tags: ["@svg","--name()","$name()","circle*9"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
