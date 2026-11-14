// observable-plot example: Scales: band interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: band interval',
  summary:
    'A bar chart on a band x scale with interval \"day\": days with no data stay on the axis as gaps; without it the bars sit next to each other.',
  section: 'Scales',
  tags: ['interval', 'band', 'barY', 'transform'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
