// @match reads n inside @m for conic stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: inside a sequence",
  summary: "Inside @m12 the step n is available to the condition. n % 2 = 0 alternates black and white wedges of a conic gradient. The variants use other moduli and counts.",
  section: "Values",
  tags: ["@match","@m","n","conic-gradient"],
  docs: ["pages/css-doodle-com/reference/function-match.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
