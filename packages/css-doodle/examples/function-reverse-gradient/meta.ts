// @reverse.$colors flips a custom property list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reverse: a stored list, flipped",
  summary: "A custom property holds a list of colors. The top cell uses it as written; the bottom cell passes it through @reverse, so the same gradient runs the other way.",
  section: "Values",
  tags: ["@reverse","$colors","linear-gradient"],
  docs: ["pages/css-doodle-com/reference/function-reverse.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
