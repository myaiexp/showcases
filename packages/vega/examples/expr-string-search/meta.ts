// vega example: Expressions: String Search and Slice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: String Search and Slice",
  summary:
    "A sentence drawn as character boxes: type a needle to see indexof and lastindexof outline where it starts, and slide from and to to shade slice and substring, with the results in a table.",
  section: 'Expressions',
  tags: ["expression.indexof","expression.lastindexof","expression.slice","expression.substring","expression.split"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/flatten.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
