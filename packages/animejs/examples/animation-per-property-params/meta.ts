// anime.js example: Per-property tween parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-property tween parameters',
  summary: 'Global delay and duration apply to every property, but x, rotate and scale each override delay, duration and ease locally. Sliders change the rotate overrides.',
  section: 'Animation',
  tags: ['animate', 'delay', 'duration', 'ease', 'tween parameters'],
  docs: [
    'pages/animejs-com/documentation/animation/tween-parameters/delay.md',
    'pages/animejs-com/documentation/animation/tween-parameters/duration.md',
    'pages/animejs-com/documentation/animation/tween-parameters/ease.md',
    'pages/animejs-com/documentation/animation/tween-parameters/to.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
