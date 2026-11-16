// fabric example: Object caching: the cache size limits in config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: the cache size limits in config',
  summary:
    'perfLimitSizeTotal, maxCacheSideLimit and minCacheSideLimit from config decide how big an object cache canvas may be. Lower them and the cache shrinks and the star blurs; raise the minimum and a small cache is padded. Each render sets the limits and restores them at once.',
  section: 'Object caching',
  tags: ['config', 'perfLimitSizeTotal', 'maxCacheSideLimit', 'minCacheSideLimit', 'objectCaching'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/api/variables/config.md',
    'repo/src/content/docs/api/classes/Polygon.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
