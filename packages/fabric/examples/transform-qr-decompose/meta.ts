// fabric example: Transformations: qrDecompose of a matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: qrDecompose of a matrix',
  summary:
    "util.qrDecompose(matrix) returns angle, scaleX, scaleY, skewX and the translation for a matrix, with skewY always 0. The rectangle is drawn from those values and composeMatrix reproduces the matrix.",
  section: 'Transformations',
  tags: ['qrDecompose','composeMatrix','applyTransformToObject'],
  docs: ['repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/api/namespaces/util/functions/qrDecompose.md', 'repo/src/content/docs/api/namespaces/util/functions/composeMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/applyTransformToObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
