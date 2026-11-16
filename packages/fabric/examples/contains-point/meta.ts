// fabric example: Objects: containsPoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Objects: containsPoint',
  summary:
    'containsPoint(point) tests a Point against the object\'s rotated bounding box (shown dashed), not its drawn outline; the star turns green while the draggable dot is inside that box.',
  section: 'Objects',
  tags: ['containsPoint', 'Point', 'getCenterPoint'],
  docs: ['repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Polygon.md', 'repo/src/content/docs/api/classes/Point.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
