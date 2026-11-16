// fabric example: Free drawing: straight line key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: straight line key',
  summary:
    'While the key named by PencilBrush.straightLineKey (Shift by default) is held, drawStraightLine is on and the stroke runs straight from its start to the pointer. Pick another key or turn it off.',
  section: 'Free drawing',
  tags: ['PencilBrush', 'straightLineKey', 'drawStraightLine', 'isDrawingMode'],
  docs: [
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
