// observable-plot example: Normalize: choosing a basis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize: choosing a basis',
  summary:
    'The basis option decides what each series is divided by: first, last, min, max, mean, median, a percentile, sum, extent or deviation. A select cycles through them on four stocks.',
  section: 'Transform: Normalize',
  tags: ['lineY', 'normalizeY', 'basis', 'extent', 'deviation', 'percentile'],
  docs: ['repo/docs/transforms/normalize.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
