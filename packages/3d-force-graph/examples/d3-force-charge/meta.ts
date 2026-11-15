// 3d-force-graph example: Force engine: the charge force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: the charge force",
  summary:
    "d3Force('charge') returns the many-body force. Its strength is negative for repulsion (the 3D default is -60) and positive for attraction; set it, then call d3ReheatSimulation() so the layout moves.",
  section: "Force engine configuration",
  tags: ['d3Force', 'd3ReheatSimulation', 'onEngineStop'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
