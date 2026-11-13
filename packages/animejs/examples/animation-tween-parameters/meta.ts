// Animation example: global against local tween parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween parameters global and local',
  summary: 'One box moves, scales and fades. Pick delay, duration or ease and set it either globally for every property or locally on x only, and watch which motion changes. The generated animate() call is shown under the box.',
  section: 'Animation',
  tags: ['animate', 'tween parameters', 'delay', 'duration', 'ease', 'animatable properties'],
  docs: [
    'pages/animejs-com/documentation/animation/tween-parameters.md',
    'pages/animejs-com/documentation/animation/animatable-properties.md',
    'pages/animejs-com/documentation/animation/animation-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
