// fabric example: Selection: altSelectionKey
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: altSelectionKey',
  summary:
    'When a shape lies on top of the active object, a click picks the top shape. Holding the key named by canvas.altSelectionKey makes the click land on the active object underneath.',
  section: 'Selection',
  tags: ['altSelectionKey', 'preserveObjectStacking', 'setActiveObject', 'getActiveObject'],
  docs: ['repo/src/content/docs/api/classes/Canvas.md', 'repo/src/content/docs/api/interfaces/CanvasOptions.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
