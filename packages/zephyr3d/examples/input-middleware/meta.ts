// zephyr3d example: Input middleware: UI layer, scene layer, camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Input middleware: UI layer, scene layer, camera',
  summary:
    'getInput().use registers middleware that runs in order until one returns true: a UI zone that swallows its events, a scene layer that recolours a box on pointerdown, and the orbit camera with whatever is left. The readout lists which layer handled each event.',
  section: 'Basic Framework',
  tags: ['getInput', 'InputManager.use', 'camera.handleEvent', 'OrbitCameraController'],
  docs: ['repo/apps/doc/web/en/scene-basic.md', 'repo/apps/doc/src/tut-4/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
