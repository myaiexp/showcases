// Vizzu example: sort: "none" and reverse: false restore the default order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Back to the data order",
  summary:
    "A chart sorted by value and reversed returns to the order of the data set when sort is set to \"none\" and reverse to false. The columns glide back to Pop, Rock, Jazz, Metal.",
  section: "Sorting",
  tags: ['sort','reverse','none','channels'],
  docs: [
    'repo/docs/tutorial/sorting.md',
    'repo/docs/tutorial/sorting/03_a.js',
    'repo/docs/tutorial/sorting/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
