// vega example: Expressions: Date Parts, Local and UTC
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: Date Parts, Local and UTC",
  summary:
    "One moment, set by day and hour sliders, read through every date getter in local time and in UTC side by side: year, quarter, month, week, isoweek, dayofyear, date, day and the clock parts.",
  section: 'Expressions',
  tags: ["expression.year","expression.utcyear","expression.isoweek","expression.dayofyear","expression.timezoneoffset"],
  docs: ["repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
