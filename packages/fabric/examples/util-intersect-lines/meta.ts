// fabric example: Utilities: Intersection of two lines or segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Intersection of two lines or segments',
  summary:
    'Intersection.intersectLineLine on four draggable points, as infinite lines or as segments (aInfinite and bInfinite). The result holds the crossing point, or a Parallel or Coincident status with none.',
  section: 'Utilities',
  tags: ['Intersection', 'intersectLineLine', 'Point'],
  docs: ['repo/src/content/docs/api/classes/Intersection.md', 'repo/src/content/docs/api/classes/Point.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
