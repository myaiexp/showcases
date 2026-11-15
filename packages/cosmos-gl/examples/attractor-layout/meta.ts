// cosmos-gl example: Attractor layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attractor layout',
  summary:
    'Attractors arrange a chain of 240 points into a shape while the links still pull: the chain is drawn as a heart, a star, a spiral or a circle by changing only the attractor positions, and a few extra cross links bend the outline slightly.',
  section: 'Clusters, attractors & pins',
  tags: ['setPointAttractors', 'simulationAttractor', 'setLinks'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-10-attractor-force.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
