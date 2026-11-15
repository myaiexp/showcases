// zephyr3d example: Camera controllers: FPS and orbit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera controllers: FPS and orbit',
  summary:
    'Swaps camera.controller between OrbitCameraController (drag to orbit, wheel to zoom) and FPSCameraController (W/A/S/D and mouse look, with a moveSpeed option) over the same scene. Either needs camera.handleEvent in getInput().use.',
  section: 'Basic Framework',
  tags: ['camera.controller', 'OrbitCameraController', 'FPSCameraController', 'moveSpeed', 'camera.handleEvent'],
  docs: ['repo/apps/doc/web/en/scene-basic.md', 'repo/apps/doc/src/tut-4/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
