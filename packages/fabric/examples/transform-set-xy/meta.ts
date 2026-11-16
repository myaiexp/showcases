// fabric example: Transformations: Positioning by any origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Positioning by any origin',
  summary:
    "rect.setXY(point, originX, originY) moves the rectangle so that chosen point of it (a corner, an edge midpoint or the centre) lands on a canvas point; setRelativeXY does the same in the parent plane, which differs inside a rotated group.",
  section: 'Transformations',
  tags: ['setXY','setRelativeXY','getPositionByOrigin','originX','originY','Group'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Group.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
