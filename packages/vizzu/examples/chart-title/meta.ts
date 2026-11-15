// Vizzu example: config.title adds a title above the plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart title',
  summary:
    'The title property of the config adds a heading above the chart, and the plot shrinks to make room. Setting it to null later removes it again and the plot takes the space back.',
  section: 'Axes, title, tooltip',
  tags: ['title', 'config'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/04_b.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
