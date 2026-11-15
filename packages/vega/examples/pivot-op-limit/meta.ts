// vega example: Pivot: Operation and Limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pivot: Operation and Limit",
  summary:
    "Eight readings per year pivoted into one column per quarter. The op select changes how the two readings per cell combine (sum, mean, max, min, count) and the limit stops new columns from being made.",
  section: 'Transforms: Basic',
  tags: ["transform.pivot.op", "transform.pivot.limit", "transform.pivot.groupby"],
  docs: ["repo/docs/docs/transforms/pivot.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
