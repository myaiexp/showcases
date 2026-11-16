// fabric example: Free drawing: select and transform drawn paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: select and transform drawn paths',
  summary:
    'Brush strokes are ordinary Path objects. Turn isDrawingMode off and click one to select it, drag it, scale it or rotate it; turn it back on to keep drawing.',
  section: 'Free drawing',
  tags: ['isDrawingMode', 'PencilBrush', 'Path', 'selection:created', 'object:modified', 'getActiveObject'],
  docs: [
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/Path.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
