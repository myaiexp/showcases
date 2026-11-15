// 3d-force-graph example: Node styling: nodePositionUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodePositionUpdate',
  summary:
    'nodePositionUpdate runs for every node on each tick with its object, its coordinates and its data. Returning true means the position is handled, so the library does not place the node itself. Here the cubes tumble and bob around their layout position; with the box ticked off the default positioning wins and the bob disappears.',
  section: 'Node styling',
  tags: ['nodePositionUpdate', 'nodeThreeObject'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
