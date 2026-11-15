// tanstack-charts example: rollingWindow by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rollingWindow by group",
  summary:
    "With by, windows never cross groups: each series is smoothed on its own, and every row keeps its series field. The two series use the same window size; without by the window would mix them. The select compares the two settings.",
  section: "Data Transforms",
  tags: ["rollingWindow", "by", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
