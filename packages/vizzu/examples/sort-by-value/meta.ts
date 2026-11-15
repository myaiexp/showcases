// Vizzu example: sort: "byValue" on the x channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sort by value",
  summary:
    "By default markers keep the order of the data. Setting sort to \"byValue\" on the x channel orders the genres by their value, smallest first, and the columns slide into the new order.",
  section: "Sorting",
  tags: ['sort','byValue','channels'],
  docs: [
    'repo/docs/tutorial/sorting.md',
    'repo/docs/tutorial/sorting/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
