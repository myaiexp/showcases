// rect#a.b, same-id blocks merge, style { } inside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: ids, classes and a stylesheet",
  summary: "rect#a.b gives a rectangle id a and class b. Two blocks with the same name and id in one parent make one element, so the second adds its attributes to the first. A style { } block is an ordinary stylesheet inside the SVG, here coloring everything of class dot.",
  section: "SVG",
  tags: ["@svg","#id",".class","style"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
