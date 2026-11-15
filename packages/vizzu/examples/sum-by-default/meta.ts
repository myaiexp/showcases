// Vizzu example: a measure on y shows the sum of its values per category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sum is the default',
  summary:
    'With no aggregator named, Vizzu sums a measure over the records in each category. Popularity alone gives one bar, the total of all twelve records. Adding Genres to the x-axis splits that bar into the sum for each genre. Naming sum(Popularity) explicitly gives the same chart.',
  section: 'Aggregating data',
  tags: ['aggregator', 'sum', 'channels', 'set'],
  docs: [
    'repo/docs/tutorial/aggregating_data.md',
    'repo/docs/tutorial/aggregating_data/01_a.js',
    'repo/docs/tutorial/aggregating_data/01_b.js',
    'repo/docs/tutorial/aggregating_data/01_c.js',
    'repo/docs/tutorial/aggregating_data/01_d.js',
    'repo/docs/tutorial/aggregating_data/07_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
