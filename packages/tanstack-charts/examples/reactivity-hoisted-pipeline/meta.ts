// tanstack-charts example: Daily totals, then a rolling sum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Daily totals, then a rolling sum",
  summary:
    "Two transforms run before the chart: groupBy turns orders into daily revenue per region, and rollingWindow turns those daily rows into a 28-day sum. Both intermediate results are ordinary typed rows. The select changes the window size and the pipeline runs again.",
  section: "Transforms and Reactivity",
  tags: ["groupBy", "rollingWindow", "lineY", "utcDay"],
  docs: ["repo/docs/guides/transforms-and-reactivity.md", "repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
