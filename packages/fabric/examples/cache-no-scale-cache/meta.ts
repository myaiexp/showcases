// fabric example: Object caching: noScaleCache while scaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: noScaleCache while scaling',
  summary:
    'Two identical stars with thin dashed outlines, one with noScaleCache true and one false. Drag a corner: the first stretches its old bitmap (blurry) until you let go, the second repaints at every step.',
  section: 'Object caching',
  tags: ['noScaleCache', 'objectCaching', 'Polygon'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/api/classes/Polygon.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
