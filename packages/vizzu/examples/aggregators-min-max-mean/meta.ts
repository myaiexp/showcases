// Vizzu example: min(), max() and mean() written into the series name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimum, maximum and mean',
  summary:
    'An aggregator can be written into a series name: min(Popularity), max(Popularity), mean(Popularity). Each bar then shows that statistic over the records of its genre instead of their sum. The story swaps the y-axis series and the chart title together.',
  section: 'Aggregating data',
  tags: ['aggregator', 'min', 'max', 'mean', 'set'],
  docs: [
    'repo/docs/tutorial/aggregating_data.md',
    'repo/docs/tutorial/aggregating_data/02_a.js',
    'repo/docs/tutorial/aggregating_data/02_b.js',
    'repo/docs/tutorial/aggregating_data/03_a.js',
    'repo/docs/tutorial/aggregating_data/03_b.js',
    'repo/docs/tutorial/aggregating_data/04_a.js',
    'repo/docs/tutorial/aggregating_data/04_b.js',
    'repo/docs/tutorial/aggregating_data/07_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
