// Three.js example: the manual's fundamentals scene, three cubes lit by a directional light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three cubes and a light',
  summary:
    'Three MeshPhongMaterial cubes lit by one DirectionalLight. Without the light they would render black; the sliders move it and change its intensity.',
  section: 'Basics',
  tags: ['DirectionalLight', 'MeshPhongMaterial', 'BoxGeometry', 'Mesh'],
  docs: [
    'repo/manual/pages/fundamentals.html',
    'repo/docs/pages/DirectionalLight.html.md',
    'repo/docs/pages/MeshPhongMaterial.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
