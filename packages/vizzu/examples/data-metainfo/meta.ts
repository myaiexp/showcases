// Vizzu example: chart.data reports each series' categories, range, unit and length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data meta info',
  summary:
    'Once data is loaded, chart.data describes it: a dimension reports its categories and length, a measure its range, unit and length. The full view prints that object next to the chart.',
  section: 'Data',
  tags: ['chart.data', 'categories', 'range', 'unit', 'length'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/data.yaml',
    'repo/docs/tutorial/data.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
