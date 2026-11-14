// Chart.js example: Your own field names: parsing keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own field names: parsing keys',
  summary:
    'Rows from a sales table go in as they are, with no reshaping. parsing.xAxisKey names the field for the x axis and parsing.yAxisKey the column to plot; switch the column and the same rows draw a different chart.',
  section: 'General',
  tags: ['parsing', 'xAxisKey', 'yAxisKey', 'data'],
  docs: ['repo/docs/general/data-structures.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
