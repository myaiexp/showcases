// Vizzu example: a data.filter that tests Genres and Kinds together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Filter on two dimensions",
  summary:
    "A new filter replaces the old one rather than adding to it, so this one repeats the genre test and adds a test on Kinds. Only the smooth Pop and Metal records are left.",
  section: "Filtering & adding new records",
  tags: ['filter','data'],
  docs: [
    'repo/docs/tutorial/filter_add_new_records.md',
    'repo/docs/tutorial/filter_add_new_records/01.js',
    'repo/docs/tutorial/filter_add_new_records/02_a.js',
    'repo/docs/tutorial/filter_add_new_records/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
