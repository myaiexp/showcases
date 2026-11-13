// Adapters example: Texture, Fog, Light, Scene and PerspectiveCamera property names in one timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three.js adapter: camera, light, scene, fog and texture',
  summary: 'One timeline animates a checker texture (offsetX, repeatX, rotation in degrees), the fog color and near distance, a light color, the scene background and the camera focalLength. The readout prints the raw Three.js fields as they change.',
  section: 'Adapters',
  tags: ['three', 'adapter', 'Texture', 'Fog', 'PointLight', 'focalLength', 'background', 'createTimeline'],
  docs: [
    'pages/animejs-com/documentation/adapters/threejs-adapter/threejs-object-property-adapter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
