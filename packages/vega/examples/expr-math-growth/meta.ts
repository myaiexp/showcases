// vega example: Expressions: Growth Curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Growth Curves",
  summary:
    "pow, sqrt, exp and log plotted together on one axis, with min and max over all four shading the envelope; a slider moves the exponent of pow.",
  section: 'Expressions',
  tags: ["expression.pow","expression.exp","expression.min","expression.max","transform.formula"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/formula.md","repo/docs/docs/transforms/sequence.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
