// 3d-force-graph example: Force engine: d3AlphaMin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: d3AlphaMin",
  summary:
    "The simulation stops once its alpha drops below d3AlphaMin (the default of 0 never does). The readout counts the ticks until onEngineStop for the chosen value after each scramble.",
  section: "Force engine configuration",
  tags: ['d3AlphaMin', 'onEngineTick', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
