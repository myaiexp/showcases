// penrose example: crossProductMatrix gives the cross product
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'crossProductMatrix gives the cross product',
  summary:
    'For a 3-vector u, `crossProductMatrix(u)` is the skew-symmetric matrix that multiplies v into `u × v`. The perspective drawing shows u in blue, v in green and the product in red, always at right angles to both; each tab picks another pair.',
  section: 'Style: Vectors & Matrices',
  tags: ['crossProductMatrix', 'vec3', 'cross product', 'project', 'perspective'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
