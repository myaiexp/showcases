// force-graph example: Force engine: onEngineTick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: onEngineTick',
  summary:
    'onEngineTick is called on every simulation tick. Here it counts them and estimates alpha from the decay, printing both live until the engine stops.',
  section: 'Force engine configuration',
  tags: ['onEngineTick', 'onEngineStop', 'd3AlphaDecay', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
