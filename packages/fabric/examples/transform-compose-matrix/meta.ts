// fabric example: Transformations: composeMatrix from values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: composeMatrix from values',
  summary:
    "util.composeMatrix({ translateX, translateY, angle, scaleX, scaleY, skewX, skewY, flipX, flipY }) builds a matrix without an object. In the full view it is compared with the Rect's own calcOwnMatrix for the same values.",
  section: 'Transformations',
  tags: ['composeMatrix','calcOwnMatrix','flipX','flipY','skewX','skewY'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/composeMatrix.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
