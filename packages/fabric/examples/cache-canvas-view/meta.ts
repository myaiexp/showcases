// fabric example: Object caching: the cache canvas made visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: the cache canvas made visible',
  summary:
    'The hidden _cacheCanvas an object paints into, copied next to the scene with its size and the number of repaints. Scaling resizes and repaints it, rotating just copies it again; minimum cache side is 256 px.',
  section: 'Object caching',
  tags: ['objectCaching', '_cacheCanvas', 'dirty', 'minCacheSideLimit'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
