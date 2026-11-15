// cosmos-gl example: Simulation progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simulation progress',
  summary:
    'graph.progress is a number from 0 to 1 for how far the layout has cooled, and onSimulationTick passes the current alpha on every tick. Both are drawn as bars under the graph while the layout runs, and restart() fills them again.',
  section: 'Simulation control',
  tags: ['progress', 'onSimulationTick', 'start'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
