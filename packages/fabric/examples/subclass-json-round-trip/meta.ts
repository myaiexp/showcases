// fabric example: Subclassing: a subclass through JSON and classRegistry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: a subclass through JSON and classRegistry',
  summary:
    'A NoteBox subclass overrides toObject to save its note and is registered with classRegistry.setClass, so canvas.loadFromJSON can rebuild it. An unregistered type rejects the promise.',
  section: 'Subclassing',
  tags: ['classRegistry', 'setClass', 'toObject', 'fromObject', 'loadFromJSON'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/variables/classRegistry.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
