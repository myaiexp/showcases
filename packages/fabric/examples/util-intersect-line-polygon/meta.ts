// fabric example: Utilities: Intersection of a line and a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Intersection of a line and a polygon',
  summary:
    'Intersection.intersectLinePolygon returns every point where a line cuts a spinning polygon; infinite false limits it to the segment between the two dots (the intersectSegmentPolygon case).',
  section: 'Utilities',
  tags: ['Intersection', 'intersectLinePolygon', 'intersectSegmentPolygon', 'Point'],
  docs: ['repo/src/content/docs/api/classes/Intersection.md', 'repo/src/content/docs/api/classes/Point.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
