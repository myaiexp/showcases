// Vizzu example: moving a dimension from x to y stacks a grouped chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack a grouped chart',
  summary:
    'The reverse of grouping: detach Kinds from the x-axis and attach it to the y-axis, and the side-by-side columns slide on top of each other into one stacked column per genre.',
  section: 'Group/stack',
  tags: ['attach', 'detach', 'channels', 'stacking'],
  docs: [
    'repo/docs/tutorial/group_stack.md',
    'repo/docs/tutorial/group_stack/04_a.js',
    'repo/docs/tutorial/group_stack/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
