// penrose example: scale3d and shear3d on a cube
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'scale3d and shear3d on a cube',
  summary:
    'The linear 3x3 matrices `scale3d(sx, sy, sz)` and `shear3d(u, v)` change the cube without moving its centre, and they compose with the rotation by ordinary multiplication. The tabs stretch it along y, shear x by y, and combine a rotation with a stretch.',
  section: 'Style: Vectors & Matrices',
  tags: ['scale3d', 'shear3d', 'rotate3d', 'matrix product', '3D'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
