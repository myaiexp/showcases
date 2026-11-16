// fabric example: Transformations: Origin and rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Origin and rotation',
  summary:
    "An object rotates around its origin point: originX and originY choose which of its own points that is. With the origin kept on a pin, the same angle swings the rectangle differently for each choice; v7's default is the centre.",
  section: 'Transformations',
  tags: ['originX','originY','angle','setPositionByOrigin','rotate'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/classes/Rect.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
