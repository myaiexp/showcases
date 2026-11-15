// A definition inside @svg holds elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: a function that draws elements",
  summary: "A definition can sit inside @svg, where only that @svg sees it, and its body can be an element. $dot(8), $dot(5, #e6437d) and $dot(2) draw concentric circles with a default color for the first and last.",
  section: "Values",
  tags: ["--name()","$name()","@svg","circle"],
  docs: ["pages/css-doodle-com/reference/function-define.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
