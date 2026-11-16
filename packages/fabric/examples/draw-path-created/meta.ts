// fabric example: Free drawing: path:created
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: path:created',
  summary:
    'After mouse up the brush fires path:created with the new Path. The handler here restyles it: the next hue of a rainbow and a stroke width taken from its size.',
  section: 'Free drawing',
  tags: ['path:created', 'PencilBrush', 'Path', 'set', 'isDrawingMode'],
  docs: [
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
