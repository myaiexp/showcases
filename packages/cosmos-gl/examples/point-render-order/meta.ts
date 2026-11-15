// cosmos-gl example: Point render order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point render order',
  summary:
    'By default a point with a higher index is drawn on top. setPointRenderOrder takes point indices from back to front: a partial list puts just those points on top, a full list sorts every point, and null goes back to index order. Indices and layout are unchanged.',
  section: 'Point styling',
  tags: ['setPointRenderOrder', 'setPointSizes'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/history/2026/2026-09-30-point-render-order.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
