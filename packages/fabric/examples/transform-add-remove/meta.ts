// fabric example: addTransformToObject and removeTransformFromObject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: addTransformToObject and removeTransformFromObject',
  summary:
    "addTransformToObject(object, M) multiplies an object's own matrix by M in its parent plane, here a turn about the canvas origin, so the rectangle orbits; removeTransformFromObject undoes it and applyTransformToObject replaces the whole matrix.",
  section: 'Transformations',
  tags: ['addTransformToObject','removeTransformFromObject','applyTransformToObject','composeMatrix','calcOwnMatrix'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/addTransformToObject.md', 'repo/src/content/docs/api/namespaces/util/functions/removeTransformFromObject.md', 'repo/src/content/docs/api/namespaces/util/functions/applyTransformToObject.md', 'repo/src/content/docs/api/namespaces/util/functions/composeMatrix.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
