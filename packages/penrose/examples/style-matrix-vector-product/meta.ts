// penrose example: Matrix times vector, vector times matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matrix times vector, vector times matrix',
  summary:
    'For a matrix A and a vector u, `A * u` is the usual product and `u * A` multiplies by the transpose, so the two results differ unless A is symmetric. With a shear-like A, the blue arrow is `A * u` and the orange arrow is `u * A`, both starting from the grey `u`.',
  section: 'Style: Vectors & Matrices',
  tags: ['matrix', 'vector', 'product', 'transpose', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
