// Vizzu example: reverse: true on a sorted axis and on an unsorted one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reverse the order",
  summary:
    "reverse flips the order. After a byValue sort it gives descending order. Without a sort it flips the order of the data set itself: Pop, Rock, Jazz, Metal becomes Metal, Jazz, Rock, Pop.",
  section: "Sorting",
  tags: ['sort','reverse','byValue','channels'],
  docs: [
    'repo/docs/tutorial/sorting.md',
    'repo/docs/tutorial/sorting/02_a.js',
    'repo/docs/tutorial/sorting/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
