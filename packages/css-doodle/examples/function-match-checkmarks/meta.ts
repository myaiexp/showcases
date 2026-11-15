// @match(x = y, ...) in @content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Match: a mark on the diagonal",
  summary: "The condition x = y is true on the diagonal, where the cell gets a check mark; the empty string is the fallback. The variants move the mark to the anti-diagonal and to the edge.",
  section: "Values",
  tags: ["@match","@content","x","y"],
  docs: ["pages/css-doodle-com/reference/function-match.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
