// fabric example: Subclassing: a speech bubble and cacheProperties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: a speech bubble and cacheProperties',
  summary:
    'Bubble extends Rect and draws a rounded body plus a tail in _render. Its tail position and height are cacheProperties, and the tail is kept inside the object box because the cache clips anything outside it.',
  section: 'Subclassing',
  tags: ['Rect', '_render', 'cacheProperties', 'roundRect', 'customProperties'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
