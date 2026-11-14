// observable-plot example: Bin: reducers on penguins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: reducers on penguins',
  summary:
    'Binning culmen length and reducing body mass in each bin with sum, mean, median, a percentile, min, max or deviation: the y output is bound to an input y channel.',
  section: 'Transform: Bin',
  tags: ['binX', 'rectY', 'y', 'mean', 'median', 'sum', 'p90'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
