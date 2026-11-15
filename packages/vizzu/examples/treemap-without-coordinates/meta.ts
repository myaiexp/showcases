// Vizzu example: a treemap built by emptying x and y and putting dimension and measure on size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A treemap with no axes',
  summary:
    'The x and y channels are emptied and Genres and Popularity go on size, while Kinds stays on colour. With no axes left, the rectangles fill the plot as a treemap.',
  section: 'Without coordinates & noop channel',
  tags: ['size', 'attach', 'set', 'treemap'],
  docs: [
    'repo/docs/tutorial/without_coordinates_noop_channel.md',
    'repo/docs/tutorial/without_coordinates_noop_channel/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
