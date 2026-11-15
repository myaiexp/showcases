// force-graph example: Force engine: d3ReheatSimulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: d3ReheatSimulation',
  summary:
    'd3ReheatSimulation sets alpha back to 1 and restarts the countdown, so a frozen layout runs again. The card scrambles the positions every four seconds and lets the forces gather the graph.',
  section: 'Force engine configuration',
  tags: ['d3ReheatSimulation', 'onEngineStop', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
