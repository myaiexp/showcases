// observable-plot example: Map: random walk with cumsum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: random walk with cumsum',
  summary:
    'mapY with the cumsum method accumulates seeded normal noise into a random walk. A new walk redraws with a fresh seed.',
  section: 'Transform: Map',
  tags: ['lineY', 'mapY', 'cumsum', 'map'],
  docs: ['repo/docs/transforms/map.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
