// vega example: Expressions: merge()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: merge()",
  summary:
    "A rectangle styled by merge(defaults, theme, override): pick a theme and an override and later arguments win, with a table of the merged style's fields.",
  section: 'Expressions',
  tags: ["expression.merge","signal.update","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
