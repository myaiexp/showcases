// vega example: Aggregate: Operations per Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate: Operations per Group",
  summary:
    "Four sites of 24 readings each, summarised with an operation chosen by a signal: min, quartiles, median, mean, max, stdev, distinct or sum, as the table lists.",
  section: 'Transforms: Basic',
  tags: ["transform.aggregate.ops", "transform.aggregate.fields", "transform.aggregate.as", "signal.bind"],
  docs: ["repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
