// cosmos-gl example: Up to a million points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Up to a million points',
  summary:
    'A static cloud of points with the simulation off, stepped from 10,000 to 1,000,000 with a selector. Panning and zooming stay on the GPU; the caption reports how long the arrays took to build and upload, and an optional link per point adds a million links.',
  section: 'Performance',
  tags: ['enableSimulation', 'showFPSMonitor', 'setPointPositions', 'setPointColors', 'pointOpacity'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-24-links-by-point.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
