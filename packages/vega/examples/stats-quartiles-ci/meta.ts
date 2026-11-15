// vega example: Statistics: Quartiles and Confidence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Quartiles, Quantiles and Bootstrap CI',
  summary:
    'A strip plot of 70 skewed values with the quartile lines from quartiles, the 10% and 90% points from quantiles, and a bootstrapCI bar for the mean that widens as you lower alpha.',
  section: 'Statistics',
  tags: ['statistics.quartiles', 'statistics.quantiles', 'statistics.bootstrapCI'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
