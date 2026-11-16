// fabric example: Free drawing: brush shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: brush shadow',
  summary:
    'Giving a brush a Shadow draws it live under the stroke, and PencilBrush passes a copy to every Path it creates, with affectStroke turned on.',
  section: 'Free drawing',
  tags: ['PencilBrush', 'shadow', 'Shadow', 'affectStroke', 'path:created'],
  docs: [
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Shadow.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
