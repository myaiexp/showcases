// force-graph example: Force engine: cooldownTicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: cooldownTicks',
  summary:
    'cooldownTicks freezes the layout after that many ticks, wherever the nodes are by then. The status shows the tick count and the freeze; the card scrambles and reruns with 15, 50 and 200 ticks.',
  section: 'Force engine configuration',
  tags: ['cooldownTicks', 'onEngineTick', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
