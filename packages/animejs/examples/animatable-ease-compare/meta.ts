// animejs example: animatable per-property duration and ease
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animatable per-property duration and ease',
  summary: 'The same move on three animatables: a global linear ease, a property with its own duration and outElastic ease, and a setter call that overrides duration and ease for one move.',
  section: 'Animatable',
  tags: ['createAnimatable', 'duration', 'ease', 'setters', 'revert'],
  docs: [
    'pages/animejs-com/documentation/animatable/animatable-settings.md',
    'pages/animejs-com/documentation/animatable/animatable-settings/duration.md',
    'pages/animejs-com/documentation/animatable/animatable-settings/ease.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/setters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
