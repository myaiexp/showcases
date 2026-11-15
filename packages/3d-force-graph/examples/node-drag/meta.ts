// 3d-force-graph example: Interaction: drag a node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: drag a node',
  summary:
    'Nodes drag by default on the d3 engine, and each drag reheats the simulation so the rest of the graph reacts. onNodeDrag reports the move since its last call in x, y, z and onNodeDragEnd the whole move; setting fx, fy and fz on drop pins the node there.',
  section: 'Interaction',
  tags: ['onNodeDrag', 'onNodeDragEnd', 'enableNodeDrag', 'fx', 'fy', 'fz'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
