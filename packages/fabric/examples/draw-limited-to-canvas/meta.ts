// fabric example: Free drawing: limitedToCanvasSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: limitedToCanvasSize',
  summary:
    'With limitedToCanvasSize on, a brush ignores every pointer move that lands outside the canvas, so a stroke never reaches past the edge. Off, the path keeps the points you dragged out to.',
  section: 'Free drawing',
  tags: ['BaseBrush', 'limitedToCanvasSize', 'PencilBrush', 'isDrawingMode', 'path:created'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
