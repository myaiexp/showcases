// Vizzu example: set with null on x and two series on y makes one stacked column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Both series on the y-axis',
  summary:
    'Setting x to null empties it, and putting Genres and Popularity together on the y-axis stacks the four genres into a single column. Vizzu animates from the column chart to this state by itself.',
  section: 'Axes, title, tooltip',
  tags: ['channels', 'set', 'y'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/02.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
