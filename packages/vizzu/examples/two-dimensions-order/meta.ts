// Vizzu example: two dimensions on x: their order decides the grouping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Order of two dimensions",
  summary:
    "With Genres and Kinds both on the x-axis, the first in the list groups the second: one set of columns per genre, one column per kind. Swapping the list makes kinds the groups. The legend disappears while Vizzu animates the change.",
  section: "Sorting",
  tags: ['set','detach','channels','grouping','sort'],
  docs: [
    'repo/docs/tutorial/sorting.md',
    'repo/docs/tutorial/sorting/04_a.js',
    'repo/docs/tutorial/sorting/04_b.js',
    'repo/docs/tutorial/sorting/05_a.js',
    'repo/docs/tutorial/sorting/05_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
