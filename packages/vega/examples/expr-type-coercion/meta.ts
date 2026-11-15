// vega example: Expressions: Type Coercion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Type Coercion",
  summary:
    "One input string pushed through toNumber, toString, toBoolean and toDate, so empty strings, exponents and bad numbers show what each coercion returns.",
  section: 'Expressions',
  tags: ["expression.toNumber","expression.toDate","expression.toBoolean","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
