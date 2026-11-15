// cosmos-gl example: Collision iterations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collision iterations',
  summary:
    'simulationCollisionIterations runs the collision pass more than once per tick. On a dense hub whose links pull its leaves inward, one pass leaves pairs overlapping, while two to four unwind the pile in fewer ticks. The caption counts overlapping pairs.',
  section: 'Simulation forces',
  tags: ['simulationCollisionIterations', 'simulationCollision', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/collision-force/README.md', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
