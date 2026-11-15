// Vizzu example: a channel's title: 'auto', a custom string, or null
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Channel title',
  summary:
    'Each channel can carry a title shown on its axis or legend. \'auto\' uses the series name, a string replaces it, and null hides it so the axis gives the space back to the plot.',
  section: 'Axes, title, tooltip',
  tags: ['title', 'channels', 'axis', 'legend'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
