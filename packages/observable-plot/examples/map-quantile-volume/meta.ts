// observable-plot example: Map: quantile of trade volume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: quantile of trade volume',
  summary:
    'mapY with quantile turns Apple daily volume into a rank between 0 and 1. A windowY on top smooths it with a 30 day rolling mean.',
  section: 'Transform: Map',
  tags: ['lineY', 'mapY', 'quantile', 'windowY'],
  docs: ['repo/docs/transforms/map.md', 'repo/docs/transforms/window.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
