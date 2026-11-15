// zephyr3d example: A lit sphere: mesh, material and light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A lit sphere: mesh, material and light',
  summary:
    'The docs\' first scene: a SphereShape with a red LambertMaterial, lit by a DirectionalLight and seen through a PerspectiveCamera with an OrbitCameraController.',
  section: 'Getting Started',
  tags: ['Application', 'Scene', 'Mesh', 'LambertMaterial', 'DirectionalLight', 'OrbitCameraController'],
  docs: ['repo/apps/doc/web/en/first-scene.md', 'repo/apps/doc/src/tut-5/main.js', 'repo/apps/doc/web/en/first-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
