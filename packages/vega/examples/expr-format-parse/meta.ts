// vega example: Expressions: timeParse and utcParse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: timeParse and utcParse",
  summary:
    "Six strings paired with a specifier: the parsed moment in UTC and local time, its weekday, and null for the pair that does not fit.",
  section: 'Expressions',
  tags: ["expression.timeParse","expression.utcParse","expression.dayFormat","signal.bind"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
