// @match(@i = 1, @r(10), 0) draws one random number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: only the chosen value is evaluated",
  summary: "Only the value @match returns is evaluated, so @r(10) is drawn in the first cell alone and every other cell shows 0. Each redraw shows a new number in the corner.",
  section: "Values",
  tags: ["@match","@r","@content"],
  docs: ["pages/css-doodle-com/reference/function-match.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
