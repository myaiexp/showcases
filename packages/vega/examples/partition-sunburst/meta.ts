// vega example: Partition: Sunburst
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partition: Sunburst",
  summary:
    "partition lays out angle and radius, and arc marks draw a sunburst; a slider adds padding between rings.",
  section: "Transforms: Hierarchy",
  tags: ["transform.partition.size", "transform.partition.padding", "mark.arc"],
  docs: ["repo/docs/docs/transforms/partition.md", "repo/docs/docs/transforms/stratify.md", "repo/docs/docs/transforms/partition.vg.json", "repo/docs/docs/marks/arc.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
