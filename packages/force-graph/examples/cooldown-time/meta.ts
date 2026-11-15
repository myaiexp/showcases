// force-graph example: Force engine: cooldownTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: cooldownTime',
  summary:
    'cooldownTime freezes the layout once it has run for that many milliseconds (the default is 15000). The status shows the elapsed time; the card reruns with 250, 700 and 1800 ms.',
  section: 'Force engine configuration',
  tags: ['cooldownTime', 'onEngineTick', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
