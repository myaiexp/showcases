// fabric example: Selection: selectionFullyContained
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: selectionFullyContained',
  summary:
    'By default a drag-selection marquee picks every object it touches. With canvas.selectionFullyContained = true it picks only objects that lie entirely inside the rectangle.',
  section: 'Selection',
  tags: ['selectionFullyContained', 'selection', 'getActiveObjects'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/interfaces/CanvasOptions.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
