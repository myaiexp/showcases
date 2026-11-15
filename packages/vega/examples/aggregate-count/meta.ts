// vega example: Aggregate: Count per Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate: Count per Group",
  summary:
    "Group 70 trees by kind with no fields or ops and aggregate emits one row per group with a count; a height filter shrinks the groups and the table beside the chart lists the output rows.",
  section: 'Transforms: Basic',
  tags: ["transform.aggregate", "transform.aggregate.groupby", "transform.filter"],
  docs: ["repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/transforms/filter.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
