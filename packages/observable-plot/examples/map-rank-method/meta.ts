// observable-plot example: Map: rank, quantile and cumsum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: rank, quantile and cumsum',
  summary:
    'The explicit map form takes an outputs object naming the channel and its method. Switching between rank, quantile and cumsum shows what each does to the same series.',
  section: 'Transform: Map',
  tags: ['lineY', 'map', 'rank', 'quantile', 'cumsum'],
  docs: ['repo/docs/transforms/map.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
