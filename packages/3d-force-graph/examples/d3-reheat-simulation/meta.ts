// 3d-force-graph example: Force engine: d3ReheatSimulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: d3ReheatSimulation",
  summary:
    "d3ReheatSimulation() sets alpha back to 1 and restarts the cooldown clock, so a frozen layout moves again. One button reheats as is, the other scrambles the node positions first.",
  section: "Force engine configuration",
  tags: ['d3ReheatSimulation', 'cooldownTime', 'onEngineStop'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
