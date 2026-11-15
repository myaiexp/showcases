// force-graph example: Force engine: d3AlphaMin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: d3AlphaMin',
  summary:
    'd3AlphaMin is the alpha below which the layout is called settled. Two identical graphs run side by side: with 0 the engine runs until cooldownTime, with a higher value it stops after fewer ticks, counted in the captions.',
  section: 'Force engine configuration',
  tags: ['d3AlphaMin', 'onEngineTick', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
