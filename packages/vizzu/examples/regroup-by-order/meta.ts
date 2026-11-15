// Vizzu example: swapping the order of two dimensions on x changes the grouping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regroup by dimension order',
  summary:
    'With two dimensions on the x-axis, the first is the outer group and the second the inner one. Setting the list to [Kinds, Genres] instead of [Genres, Kinds] regroups the same columns by kind first.',
  section: 'Group/stack',
  tags: ['set', 'channels', 'grouping'],
  docs: [
    'repo/docs/tutorial/group_stack.md',
    'repo/docs/tutorial/group_stack/03_a.js',
    'repo/docs/tutorial/group_stack/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
