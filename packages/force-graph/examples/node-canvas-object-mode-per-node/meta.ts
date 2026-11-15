// force-graph example: Node styling: drawing mode per node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: drawing mode per node',
  summary:
    'nodeCanvasObjectMode can be a function of the node. Hubs return \'after\', so the label painter runs after their circle; every other node returns a value that is neither mode, so it keeps the default circle and no label.',
  section: 'Node styling',
  tags: ['nodeCanvasObjectMode', 'nodeCanvasObject', 'nodeColor', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
