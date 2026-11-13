// Adapters example: animate() on a Mesh, light, scene and camera through the Three.js adapter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: one animate() call per mesh',
  summary: 'After one side-effect import, a torus knot, a light, the scene background and the camera are each animated with a plain animate() call: x, rotateY in degrees, opacity, and CSS colors. The readout shows the underlying Three.js fields.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'animate', 'rotateY', 'color', 'opacity', 'fov', 'background'],
  docs: [
    'pages/animejs-com/documentation/adapters.md',
    'pages/animejs-com/documentation/adapters/threejs-adapter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
