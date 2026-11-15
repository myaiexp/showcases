// tanstack-charts example: cumulative order descending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cumulative order descending",
  summary:
    "order descending runs the accumulation from the last row backwards, which answers how much is still to come at each step. Pipeline stages are summed forwards and backwards from the same rows and the select flips between them.",
  section: "Data Transforms",
  tags: ["cumulative", "order", "orderBy", "barY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
