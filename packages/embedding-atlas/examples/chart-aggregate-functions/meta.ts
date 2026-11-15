// embedding-atlas example: encoding.y.aggregate: count, sum, mean, min, max
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate functions on a bar chart",
  summary:
    "A bar per source column value, with the y encoding aggregating the words column. Each variant swaps the aggregate function: count, sum, mean, median, min or max.",
  section: "Charts",
  tags: ['aggregate', 'count', 'sum', 'mean', 'median', 'min', 'max', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
