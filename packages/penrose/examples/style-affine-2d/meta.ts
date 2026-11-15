// penrose example: Affine 2D transformations with translation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Affine 2D transformations with translation',
  summary:
    'The transformations without a suffix, `rotate`, `scale`, `skew`, `shear` and `translate`, are 3x3 matrices in homogeneous coordinates, so they compose with `then`. Each tab moves the same square out with a translation after its own transformation, and `toHomogeneousMatrix(rotate2d(…))` lifts the linear rotation into the same form.',
  section: 'Style: Vectors & Matrices',
  tags: ['translate', 'scale', 'skew', 'shear', 'toHomogeneousMatrix', 'then'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
