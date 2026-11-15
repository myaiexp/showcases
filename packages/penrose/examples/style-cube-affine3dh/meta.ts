// penrose example: Affine 3D matrices in homogeneous coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Affine 3D matrices in homogeneous coordinates',
  summary:
    'The 4x4 matrices `translate3dh`, `rotate3dh` and `scale3dh` compose with `then`, and a point list is lifted with `toHomogeneousList` and brought back with `fromHomogeneousList`. The dashed grey face is the cube before the move; the tabs shift it, swing it and stretch it in different orders.',
  section: 'Style: Vectors & Matrices',
  tags: ['translate3dh', 'rotate3dh', 'scale3dh', 'then', 'homogeneous', '3D'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
