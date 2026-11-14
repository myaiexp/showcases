// Chart.js example: Hiding axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hiding axes",
  summary:
    "display: 'auto' hides an axis when every dataset on it is hidden. Click a legend item in the full view, and the right-hand axis follows.",
  section: 'Axes',
  tags: ['display','setDatasetVisibility','yAxisID'],
  docs: ['repo/docs/axes/_common.md','repo/docs/axes/cartesian/index.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
