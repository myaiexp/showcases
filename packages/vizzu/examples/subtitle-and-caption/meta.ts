// Vizzu example: config.subtitle and config.caption add text under the title and below the plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subtitle and caption',
  summary:
    'The subtitle sits under the title and the caption sits at the bottom of the chart, usually for the source. Both are set in the config and both reserve space only while they are present.',
  section: 'Axes, title, tooltip',
  tags: ['subtitle', 'caption', 'title', 'config'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/05.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
