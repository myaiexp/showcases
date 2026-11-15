// tanstack-charts example: groupBy built-in reducers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "groupBy built-in reducers",
  summary:
    "Every groupBy output names a reducer. count needs no value; sum, mean, min and max read one. The select swaps the reducer behind one bar chart of order amounts per region, using the same grouping each time.",
  section: "Data Transforms",
  tags: ["groupBy", "count", "sum", "mean", "min", "max"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
