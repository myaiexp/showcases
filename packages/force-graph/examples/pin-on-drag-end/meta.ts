// force-graph example: Interaction: pin nodes after dragging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: pin nodes after dragging',
  summary:
    'Dragging clears fx and fy on release, so onNodeDragEnd sets them again to leave the node where it was dropped, marked with a ring; onNodeClick clears them to release it.',
  section: 'Interaction',
  tags: ['onNodeDragEnd', 'onNodeClick', 'fx', 'fy', 'd3ReheatSimulation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
