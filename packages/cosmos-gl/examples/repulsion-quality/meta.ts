// cosmos-gl example: Repulsion quality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repulsion quality',
  summary:
    'simulationRepulsionQuality picks how carefully the repulsion force treats far-away points: \'precise\' stays calm on clustered data, \'fast\' costs less per step above 25,000 points but can shimmer while the layout is hot, and \'auto\' switches between them at 25,000 points. The full view runs 30,000 points with the frame-rate monitor on.',
  section: 'Simulation forces',
  tags: ['simulationRepulsionQuality', 'showFPSMonitor', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/many-body-force/README.md', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
