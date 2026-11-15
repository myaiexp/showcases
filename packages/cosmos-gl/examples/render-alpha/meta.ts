// cosmos-gl example: Reheat amount
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reheat amount',
  summary:
    'start(alpha) restarts the layout with the energy you choose, from a gentle nudge at 0.1 to a full restart at 1. The points are scrambled first so you can see how far each alpha lets the layout recover before it cools.',
  section: 'Simulation control',
  tags: ['start', 'render', 'simulationDecay'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
