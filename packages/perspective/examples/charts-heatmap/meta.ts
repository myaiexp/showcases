// Perspective example: the Heatmap chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap',
  summary: 'A Heatmap crosses group_by (X axis) with split_by (Y axis) and colours each cell with the aggregate of one column. Change the axes, the column and the aggregate.',
  section: 'Charts',
  tags: ['Heatmap', 'WebGL', 'group_by', 'split_by', 'aggregates'],
  docs: ['repo/packages/viewer-charts/README.md', 'repo/docs/md/how_to/javascript/viewer.md', 'repo/docs/md/explanation/view/config/grouping_and_pivots.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
