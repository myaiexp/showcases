// fabric example: Free drawing: decimate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: decimate',
  summary:
    'PencilBrush.decimate discards recorded points that are less than that many pixels apart before the path is built. The readout counts the commands of each finished Path.',
  section: 'Free drawing',
  tags: ['PencilBrush', 'decimate', 'decimatePoints', 'Path', 'path:created'],
  docs: [
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Path.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
