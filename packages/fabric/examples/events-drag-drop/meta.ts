// fabric example: Events: dragenter, dragover and drop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: dragenter, dragover and drop',
  summary:
    'The canvas passes on the DOM drag events dragenter, dragover, dragleave and drop with the target and the scenePoint under the pointer. Cancelling dragover allows the drop, and a handler places a shape at the drop point.',
  section: 'Events',
  tags: ['dragenter', 'dragover', 'dragleave', 'drop', 'DragEventData', 'DropEventData', 'scenePoint'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/DragEventData.md',
    'repo/src/content/docs/api/interfaces/DropEventData.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
