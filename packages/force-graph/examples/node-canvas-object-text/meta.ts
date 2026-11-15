// force-graph example: Node styling: text nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: text nodes',
  summary:
    'nodeCanvasObject in replace mode paints each node itself: a rounded box with the name inside, its font size divided by globalScale so it stays the same on screen at any zoom. nodePointerAreaPaint covers the box so hovering works over the whole of it.',
  section: 'Node styling',
  tags: ['nodeCanvasObject', 'nodeCanvasObjectMode', 'nodePointerAreaPaint', 'onNodeHover', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
