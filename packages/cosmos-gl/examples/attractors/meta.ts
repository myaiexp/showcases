// cosmos-gl example: Attractors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attractors',
  summary:
    'setPointAttractors gives each point its own target, as [x1, y1, x2, y2, …], and simulationAttractor sets how hard points are pulled toward theirs. A NaN pair means no attractor: every fourth point here has none and is left to the links and the other forces.',
  section: 'Clusters, attractors & pins',
  tags: ['setPointAttractors', 'simulationAttractor', 'setConfigPartial'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-10-attractor-force.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
