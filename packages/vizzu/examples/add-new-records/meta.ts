// Vizzu example: data.records adds records to a chart that is already showing data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add new records',
  summary:
    'Passing records in data adds them to the chart that is already showing: three Soul records slide in as a new column. The chart starts with a filter that hides Soul. Added records stay in the data when the story rewinds, so they are added only on the first pass, and later passes just switch the filter off. The data never grows.',
  section: 'Filtering & adding new records',
  tags: ['records', 'filter', 'data'],
  docs: [
    'repo/docs/tutorial/filter_add_new_records.md',
    'repo/docs/tutorial/filter_add_new_records/04_a.js',
    'repo/docs/tutorial/filter_add_new_records/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
