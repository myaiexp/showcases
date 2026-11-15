// cosmos-gl example: Collision cooling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision cooling',
  summary:
    'simulationCollisionCooling decides whether collision fades as the layout cools. At 0 it stays at full strength to the end, at 1 it fades with alpha like the other forces and leaves some overlap. A short decay makes the cooling quick to see.',
  section: 'Simulation forces',
  tags: ['simulationCollisionCooling', 'simulationCollision', 'simulationDecay'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/collision-force/README.md', 'repo/history/2026/2026-10-07-collision-constraint.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
