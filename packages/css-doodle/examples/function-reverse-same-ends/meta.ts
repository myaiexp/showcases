// Reversed relative commands keep the start and end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reverse: same ends, other route",
  summary: "Pink is `h 10 v 5 h 5 v 10`, black is the same path through @reverse, which gives `v 10 h 5 v 5 h 10`. The values stay as they are, so both paths start and end at the same two points and only the route between them changes.",
  section: "Values",
  tags: ["@reverse","@svg","path"],
  docs: ["pages/css-doodle-com/reference/function-reverse.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
