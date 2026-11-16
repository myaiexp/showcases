// fabric example: Selection: an ActiveSelection of several objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: an ActiveSelection of several objects',
  summary:
    'new ActiveSelection(objects, { canvas }) passed to setActiveObject() selects several objects as one: it takes drags, scaling and rotation, and getActiveObjects() lists the members.',
  section: 'Selection',
  tags: ['ActiveSelection', 'setActiveObject', 'getActiveObjects', 'discardActiveObject'],
  docs: [
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/api/classes/ActiveSelection.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
