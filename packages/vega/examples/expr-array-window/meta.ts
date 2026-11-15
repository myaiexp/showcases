// vega example: Expressions: clampRange and inrange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: clampRange and inrange",
  summary:
    "A window over 24 bars that you centre and size; clampRange slides it back inside the data without changing its span, inrange colours the bars it covers, and a caption reads span and extent.",
  section: 'Expressions',
  tags: ["expression.clampRange","expression.inrange","expression.span","expression.extent","expression.pluck"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/filter.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
