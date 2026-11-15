// tanstack-charts example: cumulative running total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cumulative running total",
  summary:
    "cumulative extends every input row with a running output. Daily orders are summed per day, then a running sum per region draws growth that never goes down; each row keeps its daily revenue next to the total.",
  section: "Data Transforms",
  tags: ["cumulative", "groupBy", "sum", "lineY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
