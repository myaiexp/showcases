// vega example: Window: Ranking Operations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Window: Ranking Operations",
  summary:
    "Nine scores with ties, ranked from highest. Cycle row_number, rank, dense_rank, percent_rank, cume_dist and ntile(3): peers share a rank, rank leaves gaps, dense_rank does not.",
  section: 'Transforms: Basic',
  tags: ["transform.window.ops", "transform.window.params", "transform.window.sort", "transform.window.fields"],
  docs: ["repo/docs/docs/transforms/window.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
