// cosmos-gl example: Center force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Center force',
  summary:
    'simulationCenter moves the whole graph\'s middle back to the center of the space without squeezing it, while simulationGravity pulls every point in and shrinks it. A graph that starts off to the side shows the difference against the cross.',
  section: 'Simulation forces',
  tags: ['simulationCenter', 'simulationGravity', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
