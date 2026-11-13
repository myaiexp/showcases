// Perspective example: the Y-series chart family and X Bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Y-series charts and X Bar',
  summary: 'Y Bar, X Bar, Y Line, Y Area and Y Scatter share one mapping: group_by is the category axis, split_by makes a series per value, and columns are the plotted values. Swap the plugin and keep the query.',
  section: 'Charts',
  tags: ['Y Bar', 'X Bar', 'Y Line', 'Y Area', 'Y Scatter', 'WebGL', 'group_by', 'split_by'],
  docs: ['repo/packages/viewer-charts/README.md', 'repo/docs/md/how_to/javascript/viewer.md', 'repo/docs/md/explanation/view/config/expressions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
