// Adapters example: skew, transformOrigin and the visibility flip on Three.js cubes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: skew, origin and visibility',
  summary: 'Three cubes animate with the adapter extras: a lift plus rotateY, CSS-style skewX/skewZ pivoting on the base, and scale with a transformOrigin sliding corner to corner. In the full view, buttons show that scaleX 0 through utils.set() hides the mesh while a direct write does not.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'skewX', 'skewZ', 'transformOrigin', 'scale', 'visible', 'utils.set'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/threejs-transforms-adapter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
