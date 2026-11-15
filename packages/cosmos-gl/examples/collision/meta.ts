// cosmos-gl example: Collision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision',
  summary:
    'simulationCollision pushes points apart when they overlap, using a radius of half each point\'s size. At 0 the heap of different-sized points stacks up under gravity, at 1 and above they separate. The caption counts the pairs that still overlap.',
  section: 'Simulation forces',
  tags: ['simulationCollision', 'setPointSizes', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/collision-force/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
