// cosmos-gl example: Decay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Decay',
  summary:
    'simulationDecay sets how many ticks the layout takes to cool from full energy to a stop: a small value ends it quickly with a rough layout, a large one keeps it working. The caption counts ticks and shows the falling alpha.',
  section: 'Simulation forces',
  tags: ['simulationDecay', 'onSimulationTick', 'onSimulationEnd'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
