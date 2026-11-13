// Three.js example: composing and decomposing Matrix4 by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composing matrices by hand',
  summary:
    'A cube with matrixAutoUpdate off, whose matrix is written with Matrix4.compose from a position, quaternion and scale. A wireframe cube is rebuilt with decompose, and drifts away once you add a shear that cannot be decomposed.',
  section: 'Next Steps',
  tags: ['Matrix4', 'compose', 'decompose', 'matrixAutoUpdate', 'Quaternion'],
  docs: [
    'repo/manual/pages/matrix-transformations.html',
    'repo/docs/pages/Matrix4.html.md',
    'repo/docs/pages/Object3D.html.md',
    'repo/docs/pages/Quaternion.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
