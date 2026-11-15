// vega example: Expressions: Type Checking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Type Checking",
  summary:
    "Nine sample values (a number, a string, NaN, an array, a Date, a RegExp...) and the nine is* predicates answering about whichever one you pick.",
  section: 'Expressions',
  tags: ["expression.isArray","expression.isNumber","expression.isValid","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
