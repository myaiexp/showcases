// force-graph example: Node styling: shapes by group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: shapes by group',
  summary:
    'In replace mode nodeCanvasObject owns the whole node, so it can draw anything: squares for group 1, triangles for group 2, diamonds for group 3 and circles for group 4. nodePointerAreaPaint traces the same shapes so hover matches.',
  section: 'Node styling',
  tags: ['nodeCanvasObject', 'nodeCanvasObjectMode', 'nodePointerAreaPaint', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
