// Vizzu example: set puts series on the x and y channels, replacing what was there
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Column chart with set',
  summary:
    'set gives a channel exactly the series you list: Genres on x and Popularity on y make a column chart. Setting x again with a different series swaps it, and the columns move to their new places.',
  section: 'Axes, title, tooltip',
  tags: ['channels', 'set', 'x', 'y'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/assets/setup/setup_b.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
