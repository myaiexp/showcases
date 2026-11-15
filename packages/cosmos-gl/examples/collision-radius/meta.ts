// cosmos-gl example: Collision radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision radius',
  summary:
    'simulationCollisionRadius set above 0 gives every point the same collision radius whatever its drawn size, so big points can sit closer than they look and small ones keep a lot of room. At 0 the radius comes from each point\'s size.',
  section: 'Simulation forces',
  tags: ['simulationCollisionRadius', 'simulationCollision', 'setPointSizes'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/collision-force/README.md', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
