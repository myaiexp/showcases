// 3d-force-graph example: Force engine: cooldownTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: cooldownTime",
  summary:
    "cooldownTime freezes the layout after that many milliseconds of simulation (the default is 15000). A readout counts the elapsed time against the limit after each scramble.",
  section: "Force engine configuration",
  tags: ['cooldownTime', 'onEngineStop', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
