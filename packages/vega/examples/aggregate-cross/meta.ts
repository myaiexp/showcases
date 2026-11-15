// vega example: Aggregate: Cross Product of Groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate: Cross Product of Groups",
  summary:
    "Ten orders cover only some size and colour pairs. Toggling cross adds the missing pairs as cells with a count of 0 and the output row count in the title jumps from 7 to 12.",
  section: 'Transforms: Basic',
  tags: ["transform.aggregate.cross", "transform.aggregate.groupby", "signal.bind"],
  docs: ["repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
