// fabric example: Free drawing: circle brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: circle brush',
  summary:
    'CircleBrush drops a random-sized, random-opacity circle at every pointer move. When you let go the dots become a Group of Circle objects, announced by path:created.',
  section: 'Free drawing',
  tags: ['CircleBrush', 'freeDrawingBrush', 'isDrawingMode', 'width', 'color', 'path:created', 'Group'],
  docs: [
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/CircleBrush.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
