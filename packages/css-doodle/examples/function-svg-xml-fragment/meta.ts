// A lone element is wrapped in an svg with xmlns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: XML fragments get a wrapper",
  summary: "In the XML form, xmlns is added if it is missing, and a fragment such as a lone <rect/> is wrapped in an <svg>. The variants write the same square as a full document without xmlns and as a bare fragment.",
  section: "SVG",
  tags: ["@svg","XML","xmlns"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
