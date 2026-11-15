// cosmos-gl example: Simulation during zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simulation during zoom',
  summary:
    'By default the layout pauses while the view zooms. enableSimulationDuringZoom keeps it running, and the enableSimulation argument of setZoomLevel() and the fit calls overrides the setting for that one call. Each zoom reports how many simulation ticks ran during it.',
  section: 'View & zoom',
  tags: ['enableSimulationDuringZoom', 'setZoomLevel', 'fitView', 'onSimulationTick', 'onZoomStart', 'onZoomEnd'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
