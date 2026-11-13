// Three.js example: sun, earth and moon as nested Object3D nodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene graph: a solar system',
  summary:
    'The sun, earth and moon built from nested Object3D nodes: each child spins and orbits inside its parent local space. Toggle an AxesHelper and GridHelper on any node to see that space.',
  section: 'Fundamentals',
  tags: ['Object3D', 'scene graph', 'AxesHelper', 'GridHelper', 'PointLight', 'OrbitControls'],
  docs: [
    'repo/manual/pages/scenegraph.html',
    'repo/docs/pages/Object3D.html.md',
    'repo/docs/pages/AxesHelper.html.md',
    'repo/docs/pages/GridHelper.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
