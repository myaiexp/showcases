// tanstack-charts example: cumulative reducers: sum, max, mean
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cumulative reducers: sum, max, mean",
  summary:
    "The reducer decides what runs along the rows: sum gives a running total, max the record so far, mean the average so far. The select swaps the reducer for one noisy series and draws it over the raw values.",
  section: "Data Transforms",
  tags: ["cumulative", "sum", "max", "mean", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
