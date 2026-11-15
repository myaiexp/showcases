// force-graph example: Interaction: drag a node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: drag a node',
  summary:
    'Nodes drag by default, and each drag reheats the simulation so the rest of the graph reacts. onNodeDrag reports the move since its last call and onNodeDragEnd the whole move; setting fx and fy on drop pins the node there.',
  section: 'Interaction',
  tags: ['onNodeDrag', 'onNodeDragEnd', 'enableNodeDrag', 'fx', 'fy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
