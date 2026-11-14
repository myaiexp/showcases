// Chart.js example: Points with a trend line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points with a trend line",
  summary:
    "A scatter chart with one dataset switched to type 'line': the points show the raw data and a two-point dashed line shows its overall direction.",
  section: 'Chart types',
  tags: ['mixed','scatter','line','trend'],
  docs: ['repo/docs/charts/mixed.md', 'repo/docs/charts/scatter.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
