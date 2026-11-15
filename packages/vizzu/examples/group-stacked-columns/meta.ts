// Vizzu example: moving a dimension from y to x turns stacked columns into groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group a stacked chart',
  summary:
    'Detaching Kinds from the y-axis and attaching it to the x-axis moves its pieces from on top of each other to beside each other: a grouped column chart, with each genre holding one column per kind.',
  section: 'Group/stack',
  tags: ['attach', 'detach', 'channels', 'grouping'],
  docs: [
    'repo/docs/tutorial/group_stack.md',
    'repo/docs/tutorial/group_stack/02_a.js',
    'repo/docs/tutorial/group_stack/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
