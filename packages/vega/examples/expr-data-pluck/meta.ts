// vega example: Expressions: Summarising data()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Summarising data()",
  summary:
    "A bar chart whose rows are replaced on a button or timer, beside a table in which data(), pluck, extent, sort, peek, slice and indata summarise the live rows; the tallest bar is found by peek(sort(...)).",
  section: 'Expressions',
  tags: ["expression.data","expression.pluck","expression.extent","expression.sort","expression.peek"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/data.md","repo/docs/docs/transforms/aggregate.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
