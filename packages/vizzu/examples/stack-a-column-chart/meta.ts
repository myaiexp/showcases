// Vizzu example: a dimension added to y and to color stacks the columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack a column chart',
  summary:
    'To stack, add a second dimension to the channel that holds the measure (y). On its own that would pile same-coloured pieces, so the same dimension also goes on the color channel. Kinds splits each genre column into coloured parts.',
  section: 'Group/stack',
  tags: ['attach', 'channels', 'color', 'stacking'],
  docs: [
    'repo/docs/tutorial/group_stack.md',
    'repo/docs/tutorial/group_stack/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
