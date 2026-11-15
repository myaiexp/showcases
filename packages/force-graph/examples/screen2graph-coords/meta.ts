// force-graph example: Utility: screen2GraphCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utility: screen2GraphCoords',
  summary:
    'screen2GraphCoords turns pixel coordinates into graph coordinates. A click on empty space (onBackgroundClick, using the event\'s offsetX and offsetY) adds a node exactly under the pointer and links it to its nearest neighbour.',
  section: 'Utility',
  tags: ['screen2GraphCoords', 'onBackgroundClick', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
