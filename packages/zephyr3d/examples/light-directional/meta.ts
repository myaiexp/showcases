// zephyr3d example: Directional light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Directional light',
  summary:
    'A sun-like DirectionalLight over boxes and a floor: its direction comes from the node rotation (set with rotation.fromEulerAngle), and colour and intensity are properties. A toggle turns the default environment light back on to see why the docs switch it off.',
  section: 'Lighting',
  tags: ['DirectionalLight', 'rotation.fromEulerAngle', 'color', 'intensity', 'env.light.type'],
  docs: ['repo/apps/doc/web/en/lighting-direct.md', 'repo/apps/doc/src/tut-11/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
