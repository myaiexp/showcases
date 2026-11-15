// Expressions: a bitwise and and a comparison in $() make a Sierpinski triangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Comparisons and bitwise operators',
  summary:
    '$() speaks a small expression language. Comparisons give 1 or 0, so they can be an opacity directly, and bitwise operators work on the column and row: cells where (x - 1) & (y - 1) is 0 form a Sierpinski triangle. The other variants use | and % instead.',
  section: 'Syntax overview',
  tags: ["$()", "expressions", "&", "|", "%", "comparison"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
