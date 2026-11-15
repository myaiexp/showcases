// @svg blocks are elements, declarations attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: a circle from a block",
  summary: "Inside @svg(…), the block circle { … } is a <circle> and its declarations are attributes; declarations outside it belong to the <svg> itself. viewBox: 10 is short for 0 0 10 10, and cx, cy: 5 sets both coordinates. The result is a url() for the background.",
  section: "SVG",
  tags: ["@svg","viewBox","circle","cx, cy"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
