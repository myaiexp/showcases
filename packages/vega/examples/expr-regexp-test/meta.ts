// vega example: Expressions: regexp() and test()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: regexp() and test()",
  summary:
    "Ten strings in two columns that light up when test(regexp(pattern, flags), string) is true, with six patterns and an ignore-case flag to choose from.",
  section: 'Expressions',
  tags: ["expression.regexp","expression.test","transform.formula","signal.bind"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/formula.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
