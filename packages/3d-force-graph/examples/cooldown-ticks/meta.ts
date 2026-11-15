// 3d-force-graph example: Force engine: cooldownTicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: cooldownTicks",
  summary:
    "cooldownTicks freezes the layout after that many frames of simulation, one tick per frame. A readout counts the ticks against the limit after each scramble.",
  section: "Force engine configuration",
  tags: ['cooldownTicks', 'onEngineTick', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
