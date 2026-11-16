// fabric example: Subclassing: cacheProperties and a stale cache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: cacheProperties and a stale cache',
  summary:
    'Two identical rect subclasses draw a dot sized by a custom property. Only the one listing it in static cacheProperties repaints after set(); the other keeps its old bitmap until dirty is set by hand.',
  section: 'Subclassing',
  tags: ['cacheProperties', 'dirty', 'objectCaching', 'set'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
