// zephyr3d example: OrbitCameraController: center and speed options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'OrbitCameraController: center and speed options',
  summary:
    'Three landmarks to orbit: OrbitCameraController({ center }) picks the pivot, and zoomSpeed (the docs: 5 units per wheel notch), rotateSpeed, panSpeed and damping are options you can change with setOptions.',
  section: 'Basic Framework',
  tags: ['OrbitCameraController', 'center', 'zoomSpeed', 'rotateSpeed', 'panSpeed', 'damping', 'setOptions'],
  docs: ['repo/apps/doc/web/en/scene-basic.md', 'repo/apps/doc/src/tut-4/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
