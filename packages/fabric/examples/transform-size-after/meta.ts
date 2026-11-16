// fabric example: Transformations: sizeAfterTransform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: sizeAfterTransform',
  summary:
    "util.sizeAfterTransform(width, height, matrix) returns the width and height of the bounding box of a rectangle after a matrix is applied. The dashed box is drawn from it and agrees with getBoundingRect.",
  section: 'Transformations',
  tags: ['sizeAfterTransform','calcOwnMatrix','getBoundingRect','skewX'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/sizeAfterTransform.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
