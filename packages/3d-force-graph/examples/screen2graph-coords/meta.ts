// 3d-force-graph example: Utility: screen2GraphCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: screen2GraphCoords",
  summary:
    "screen2GraphCoords(x, y, distance) converts a canvas pixel to a point in the graph at a distance from the camera. A click on empty space adds a pinned node there, linked to its nearest neighbour.",
  section: "Utility",
  tags: ['screen2GraphCoords', 'onBackgroundClick', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
