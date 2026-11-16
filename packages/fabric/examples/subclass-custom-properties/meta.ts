// fabric example: Subclassing: static customProperties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: static customProperties',
  summary:
    'A Task subclass lists owner and done in static customProperties, so toObject and clone carry them with no argument. A plain Rect with the same properties assigned loses them.',
  section: 'Subclassing',
  tags: ['customProperties', 'toObject', 'clone', 'Rect'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
