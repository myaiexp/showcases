// fabric example: Object caching: which set() calls make an object dirty
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: which set() calls make an object dirty',
  summary:
    'A table built by calling Rect.set() on fresh rects and reading dirty: fill, stroke, width, rx and paintFirst flag the cache stale, left, angle, scale and opacity do not. Pick one and apply it to the visible rect to see dirty before and after a render.',
  section: 'Object caching',
  tags: ['dirty', 'cacheProperties', 'set', 'objectCaching'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
