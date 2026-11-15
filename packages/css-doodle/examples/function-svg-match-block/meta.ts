// A match block keeps elements where the test holds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: @match(test) { } keeps parts",
  summary: "Inside a @svg repeat, @match(test) { … } keeps its body only where the test is true: its declarations set attributes of the element around it and its elements are added there. Here the dots on both diagonals turn pink and get a ring; the variants change the test.",
  section: "SVG",
  tags: ["@svg","@match","g*5x5","@nx","@ny"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
