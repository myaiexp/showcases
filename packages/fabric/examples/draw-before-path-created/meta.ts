// fabric example: Free drawing: before:path:created
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: before:path:created',
  summary:
    'before:path:created fires just before the new Path is added, path:created just after. The log compares the object counts, and a handler can still change the path before it lands.',
  section: 'Free drawing',
  tags: ['before:path:created', 'path:created', 'PencilBrush', 'Path', 'opacity'],
  docs: [
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
