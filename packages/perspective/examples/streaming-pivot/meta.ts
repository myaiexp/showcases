// Perspective example: A streaming pivot table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A streaming pivot table",
  summary:
    "Orders stream into a table pivoted by Region and State, split by Category, with sum and avg aggregates. A separate View subscribes with on_update in row mode and re-reads the totals on every batch.",
  section: "Use Cases",
  tags: ["streaming", "pivot", "group_by", "split_by", "aggregates", "on_update", "row mode"],
  docs: ["repo/docs/md/use_cases/streaming_pivot_table.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
