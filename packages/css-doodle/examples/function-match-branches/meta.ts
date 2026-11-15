// @match with several condition and value pairs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: the first true condition wins",
  summary: "With pairs of condition and value, @match returns the value of the first true condition and the last argument as the fallback. Using dr, the distance from the center, gives rings of black, pink and yellow.",
  section: "Values",
  tags: ["@match","dr"],
  docs: ["pages/css-doodle-com/reference/function-match.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
