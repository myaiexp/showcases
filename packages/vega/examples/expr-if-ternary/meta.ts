// vega example: Expressions: if() and the Ternary
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: if() and the Ternary",
  summary:
    "Twelve bars coloured by an if() call and faded by the equivalent ternary operator against a cut signal, with a caption that counts the bars at or above it.",
  section: 'Expressions',
  tags: ["expression.if","encode.update.signal","signal.bind"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/filter.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
