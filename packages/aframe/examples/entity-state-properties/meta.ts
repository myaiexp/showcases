// aframe example: Entity properties: hasLoaded, isPlaying, object3D, object3DMap, sceneEl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Entity properties: hasLoaded, isPlaying, object3D, object3DMap, sceneEl',
  summary:
    'A board in the scene prints an entity\'s hasLoaded, isPlaying, object3D, object3DMap keys and sceneEl, refreshed live. Pausing the entity stops its animation and flips isPlaying to false.',
  section: 'Core API',
  tags: ['hasLoaded', 'isPlaying', 'object3D', 'object3DMap', 'sceneEl', 'pause', 'play'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
