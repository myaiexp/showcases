// fabric example: Events: object:added and object:removed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: object:added and object:removed',
  summary:
    'add(), insertAt(), remove() and clear() fire object:added and object:removed on the canvas and added and removed on each object, with the container as the target of the object event.',
  section: 'Events',
  tags: ['object:added', 'object:removed', 'added', 'removed', 'canvas:cleared', 'add', 'insertAt', 'remove', 'clear'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/interfaces/CollectionEvents.md',
    'repo/src/content/docs/api/interfaces/ObjectEvents.md',
    'repo/src/content/docs/api/interfaces/StaticCanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
