// @match(condition, value, fallback) by cell index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: a condition picks the color",
  summary: "@match(i > 12, #e6437d, #000) is pink in every cell whose index is above 12 and black in the others. The variants change the condition to the cell index parity, a comparison of two cell variables, and an index range.",
  section: "Values",
  tags: ["@match","i","x","y"],
  docs: ["pages/css-doodle-com/reference/function-match.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
