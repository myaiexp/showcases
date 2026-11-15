// The overview's embedded-language example: eight circles from one @svg block
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An embedded language: @svg',
  summary:
    "The syntax overview's @svg example: inside the body, blocks are SVG elements and declarations are their attributes. circle*8 makes eight copies, and @n, the copy number, places each one: cx: @n(*2) puts them 2 units apart.",
  section: 'Syntax overview',
  tags: ["@svg", "circle*N", "@n", "embedded languages"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
