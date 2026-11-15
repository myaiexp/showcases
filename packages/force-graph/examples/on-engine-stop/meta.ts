// force-graph example: Force engine: onEngineStop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: onEngineStop',
  summary:
    'onEngineStop is called when the layout freezes. New data lands at the default zoom; the handler then calls zoomToFit so the finished graph fills the canvas.',
  section: 'Force engine configuration',
  tags: ['onEngineStop', 'zoomToFit', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
