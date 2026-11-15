// Vizzu example: labelLevel picks which of several dimensions an axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label level',
  summary:
    'Only one dimension on an axis or legend is labelled by name, and labelLevel says which one by its position in the channel\'s list. With Genres and Kinds both on x, level 0 labels the genres and level 1 the kinds.',
  section: 'Axes, title, tooltip',
  tags: ['labelLevel', 'channels', 'dimension'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
