// cosmos-gl example: Collision padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision padding',
  summary:
    'simulationCollisionPadding adds room to every point\'s collision radius, so neighbours settle with a gap of twice the padding between their edges instead of just touching.',
  section: 'Simulation forces',
  tags: ['simulationCollisionPadding', 'simulationCollision', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/collision-force/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
