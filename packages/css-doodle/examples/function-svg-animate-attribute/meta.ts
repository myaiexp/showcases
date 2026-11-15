// animate r: .2; .8; .2 / 2s ease infinite
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: animate an attribute",
  summary: "animate followed by an attribute name takes values separated by semicolons, then the timing after a slash. Eight circles on a ring grow from radius 0.2 to 0.8 and shrink back over two seconds.",
  section: "SVG",
  tags: ["@svg","animate","circle*8","@Plot"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
