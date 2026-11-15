// Vizzu example: data.filter with a callback on Genres
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter on one dimension",
  summary:
    "A filter is a function that gets each record and says whether to keep it. Keeping only Pop and Metal makes the other genres vanish and the chart rescale to what is left.",
  section: "Filtering & adding new records",
  tags: ['filter','data'],
  docs: [
    'repo/docs/tutorial/filter_add_new_records.md',
    'repo/docs/tutorial/filter_add_new_records/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
