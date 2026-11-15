// Vizzu example: count() and distinct(Kinds) on the y-axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Count and distinct',
  summary:
    'count() needs no series: it counts the records in each genre. distinct(Kinds) counts how many different values of the dimension Kinds appear in each genre. The docs note that distinct is meant for dimensions, not measures.',
  section: 'Aggregating data',
  tags: ['aggregator', 'count', 'distinct', 'set'],
  docs: [
    'repo/docs/tutorial/aggregating_data.md',
    'repo/docs/tutorial/aggregating_data/05_a.js',
    'repo/docs/tutorial/aggregating_data/05_b.js',
    'repo/docs/tutorial/aggregating_data/06_a.js',
    'repo/docs/tutorial/aggregating_data/06_b.js',
    'repo/docs/tutorial/aggregating_data/07_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
