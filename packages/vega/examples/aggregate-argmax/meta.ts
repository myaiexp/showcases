// vega example: Aggregate: Argmax and Values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate: Argmax and Values",
  summary:
    "Each team's lowest and highest scorer, found with argmin and argmax: the output holds whole player objects, so the chart labels the extremes by name. New data reruns the aggregate.",
  section: 'Transforms: Basic',
  tags: ["transform.aggregate.ops", "transform.aggregate.fields"],
  docs: ["repo/docs/docs/transforms/aggregate.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
