// observable-plot example: Group: reducer gallery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: reducer gallery',
  summary:
    'The same groupY on penguin body mass with each named reducer: count, sum, mean, median, min, max, percentiles, deviation and more.',
  section: 'Transform: Group',
  tags: ['barX', 'groupY', 'reducer', 'percentile'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
