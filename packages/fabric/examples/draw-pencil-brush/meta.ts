// fabric example: Free drawing: pencil brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: pencil brush',
  summary:
    'Setting canvas.isDrawingMode to true with a PencilBrush in freeDrawingBrush turns drags into smooth paths; the brush color and width set how they look. Each stroke ends up as a Path object on the canvas.',
  section: 'Free drawing',
  tags: ['isDrawingMode', 'freeDrawingBrush', 'PencilBrush', 'color', 'width', 'path:created'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
