// tanstack-charts example: waterfall by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "waterfall by group",
  summary:
    "With by, every group gets its own running level starting from zero and, with total, its own total row. Two teams share the step names but keep separate levels; the chart puts them side by side in one band scale.",
  section: "Data Transforms",
  tags: ["waterfall", "by", "total", "barY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
