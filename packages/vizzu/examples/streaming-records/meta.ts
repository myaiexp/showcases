// Vizzu example: records added on a timer, with a filter that keeps a sliding window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stream records into a chart',
  summary:
    'A new record is added every second, as the docs suggest for real-time sources, and a filter on a counter keeps only the latest eight on screen. Records stay in the chart, so after 30 of them the whole data set is sent again, which replaces the old one, and the stream starts over.',
  section: 'Filtering & adding new records',
  tags: ['records', 'filter', 'data'],
  docs: [
    'repo/docs/tutorial/filter_add_new_records.md',
    'repo/docs/tutorial/filter_add_new_records/04_b.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
