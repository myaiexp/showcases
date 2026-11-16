// fabric example: Transformations: Order of the decomposed transforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Order of the decomposed transforms',
  summary:
    "Fabric builds an object's matrix from translation, rotation, scale, skewX and skewY in that order. The slider steps through the multiplication and checks the full product against composeMatrix.",
  section: 'Transformations',
  tags: ['multiplyTransformMatrixArray','createTranslateMatrix','createRotateMatrix','createScaleMatrix','createSkewXMatrix','createSkewYMatrix','composeMatrix','applyTransformToObject'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/composeMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/multiplyTransformMatrixArray.md', 'repo/src/content/docs/api/namespaces/util/functions/createTranslateMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/createRotateMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/createScaleMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/createSkewXMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/createSkewYMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/applyTransformToObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
