// Chart.js example: Hiding single slices or bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hiding single slices or bars',
  summary:
    'toggleDataVisibility(index) drops one category from every dataset at once, and getDataVisibility(index) tells you if it is shown. Works on doughnuts and bar charts.',
  section: 'Developers',
  tags: ['toggleDataVisibility', 'getDataVisibility', 'doughnut', 'bar'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/charts/doughnut.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
