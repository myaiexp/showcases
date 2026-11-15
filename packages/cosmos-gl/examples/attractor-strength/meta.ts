// cosmos-gl example: Attractor strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attractor strength',
  summary:
    'setPointAttractorStrength scales each point\'s pull toward its attractor. Points are chained around a ring of targets with strengths that rise along the chain, so the weak ones lag behind toward the middle and the strong ones sit on the ring.',
  section: 'Clusters, attractors & pins',
  tags: ['setPointAttractorStrength', 'setPointAttractors', 'simulationAttractor'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-10-attractor-force.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
