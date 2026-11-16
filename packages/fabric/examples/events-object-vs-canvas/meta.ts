// fabric example: Events: object events and canvas events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: object events and canvas events',
  summary:
    'The same interaction reaches the canvas as mouse:down, selection:created, object:moving and object:modified, and the object itself as mousedown, selected, moving and modified. Only the shapes with their own listeners log the second kind.',
  section: 'Events',
  tags: ['on', 'selected', 'mousedown', 'moving', 'modified', 'selection:created', 'object:moving', 'object:modified'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/interfaces/ObjectEvents.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
