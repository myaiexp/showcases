// fabric example: Object caching: drawing past the box gets cut off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: drawing past the box gets cut off',
  summary:
    'A Rect subclass that draws spikes beyond its width and height. The cached copy loses the tips because the cache canvas is sized from width and height; objectCaching false draws them whole. The old guide lists this as the main caching gotcha.',
  section: 'Object caching',
  tags: ['objectCaching', 'cacheProperties', '_render', 'Rect'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
