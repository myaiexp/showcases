// tanstack-charts example: binX by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binX by group",
  summary:
    "With by, binX bins each group separately but over one shared set of thresholds, and every row carries its group field. Two services become two frequency polygons over the same latency bins so their shapes compare directly.",
  section: "Data Transforms",
  tags: ["binX", "by", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
