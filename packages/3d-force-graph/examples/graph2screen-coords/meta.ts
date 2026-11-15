// 3d-force-graph example: Utility: graph2ScreenCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: graph2ScreenCoords",
  summary:
    "graph2ScreenCoords(x, y, z) converts a point in the graph to pixels on the canvas. A frame loop moves an HTML label over each node with it, and hides the ones behind the camera.",
  section: "Utility",
  tags: ['graph2ScreenCoords', 'camera', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
