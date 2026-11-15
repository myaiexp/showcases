// vega example: Expressions: week and isoweek Calendar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: week and isoweek Calendar",
  summary:
    "Every day of a year laid out in a week-by-weekday grid, coloured by month; a toggle swaps the Sunday-based week() columns for Monday-based isoweek() and shows where the first and last days land.",
  section: 'Expressions',
  tags: ["expression.utcweek","expression.utcisoweek","expression.utcdayofyear","expression.utcSequence"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/api/time.md","repo/docs/docs/transforms/flatten.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
