// fabric example: Transformations: Matrix multiplication order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: Matrix multiplication order',
  summary:
    "multiplyTransformMatrices(A, B) applies B first and then A, so swapping the arguments changes the result. A rotation and a translation show it: one result orbits the pin, the other turns in place and moves.",
  section: 'Transformations',
  tags: ['multiplyTransformMatrices','createRotateMatrix','createTranslateMatrix','applyTransformToObject'],
  docs: ['repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/multiplyTransformMatrices.md', 'repo/src/content/docs/api/namespaces/util/functions/createRotateMatrix.md', 'repo/src/content/docs/api/namespaces/util/functions/createTranslateMatrix.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
