// Vizzu example: data.filter: null shows every record again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switch the filter off',
  summary:
    'Passing null as the filter clears it and brings every record back. Without that, Vizzu keeps using the last filter in later states.',
  section: 'Filtering & adding new records',
  tags: ['filter', 'null', 'data'],
  docs: [
    'repo/docs/tutorial/filter_add_new_records.md',
    'repo/docs/tutorial/filter_add_new_records/02_b.js',
    'repo/docs/tutorial/filter_add_new_records/03_a.js',
    'repo/docs/tutorial/filter_add_new_records/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
