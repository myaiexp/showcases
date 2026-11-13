// Animation example: callbacks, methods and properties on one animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation callbacks, methods and properties',
  summary: 'Three squares run one percentage-keyframe animation with every callback counted. Buttons call the animation methods, sliders seek and change speed, and a readout shows currentTime, progress, iteration and the callback counts as they change.',
  section: 'Animation',
  tags: ['animate', 'keyframes', 'onBegin', 'onUpdate', 'onLoop', 'seek', 'speed', 'targets'],
  docs: [
    'pages/animejs-com/documentation/animation/animation-callbacks.md',
    'pages/animejs-com/documentation/animation/animation-methods.md',
    'pages/animejs-com/documentation/animation/animation-properties.md',
    'pages/animejs-com/documentation/animation/targets.md',
    'pages/animejs-com/documentation/animation/keyframes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
