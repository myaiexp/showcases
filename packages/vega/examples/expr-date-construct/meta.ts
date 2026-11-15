// vega example: Expressions: Building and Moving Dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Building and Moving Dates",
  summary:
    "datetime, utc and time construct dates, and timeOffset and utcOffset move one by a chosen unit and step, so a month from January 31 shows how the calendar rolls over.",
  section: 'Expressions',
  tags: ["expression.datetime","expression.utc","expression.timeOffset","expression.utcOffset","expression.now"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/api/time.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
