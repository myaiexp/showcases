// aframe example: Scene properties: camera, canvas, renderer, object3D, systems, time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene properties: camera, canvas, renderer, object3D, systems, time',
  summary:
    'A board prints the <a-scene> element\'s own properties live: the component tick behaviors, the active camera, the canvas size, the three.js scene and renderer, whether rendering started, the systems and the uptime.',
  section: 'Core API',
  tags: ['behaviors', 'camera', 'canvas', 'isMobile', 'object3D', 'renderer', 'renderStarted', 'systems', 'time'],
  docs: ['repo/docs/core/scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
