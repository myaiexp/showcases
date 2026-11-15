// Vizzu example: set: null on x removes Genres, so Vizzu aggregates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aggregate by removing a dimension',
  summary:
    'Taking the Genres dimension off the x-axis leaves one marker per colour, and Vizzu sums the popularity of the genres into it. The columns that were side by side merge into a single stack.',
  section: 'Changing dimensions',
  tags: ['set', 'null', 'aggregate', 'channels'],
  docs: [
    'repo/docs/tutorial/changing_dimensions.md',
    'repo/docs/tutorial/changing_dimensions/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
