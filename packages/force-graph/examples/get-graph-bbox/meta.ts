// force-graph example: Utility: getGraphBbox
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utility: getGraphBbox',
  summary:
    'getGraphBbox returns the bounding box of the nodes as {x: [min, max], y: [min, max]}, radius included. It is read every frame here and drawn as a dashed frame in onRenderFramePost.',
  section: 'Utility',
  tags: ['getGraphBbox', 'onRenderFramePost', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
