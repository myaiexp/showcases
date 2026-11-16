// fabric example: Canvas: interactive by default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas: interactive by default',
  summary:
    'A fabric.Canvas gives every object selection, dragging, scaling and rotation, plus group selection by dragging on empty space, with no code beyond canvas.add(). The selection events report what changed.',
  section: 'Canvas',
  tags: ['Canvas', 'selection', 'getActiveObject', 'selection:created', 'object:modified', 'oCoords'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-1.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
