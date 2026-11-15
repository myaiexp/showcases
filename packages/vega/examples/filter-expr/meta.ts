// vega example: Filter: Expression Threshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter: Expression Threshold",
  summary:
    "Ninety points, grey, with the rows passing a filter expression in orange: x at least a threshold and the base-10 log of y at least another. Both thresholds are signals, and the title counts the survivors.",
  section: 'Transforms: Basic',
  tags: ["transform.filter.expr", "signal.bind"],
  docs: ["repo/docs/docs/transforms/filter.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
