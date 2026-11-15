// Vizzu example: attach adds a series to a channel, detach removes one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attach and detach',
  summary:
    'attach adds a series to a channel beside the ones already there, and detach takes one off, so a state can be described as a change instead of a full list. The chart starts as one stacked column, then moves Popularity from y to x.',
  section: 'Axes, title, tooltip',
  tags: ['channels', 'attach', 'detach'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/03.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
