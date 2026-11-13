// animejs example: animatable getters and setters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animatable getters and setters',
  summary: 'A circle follows the pointer with chained setters (x, y, backgroundColor) and a readout calls the getters on every render. Cards drive it from a scripted path instead.',
  section: 'Animatable',
  tags: ['createAnimatable', 'getters', 'setters', 'onRender', 'utils.clamp', 'utils.mapRange'],
  docs: [
    'pages/animejs-com/documentation/animatable.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/getters.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/setters.md',
    'pages/animejs-com/documentation/animatable/animatable-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
