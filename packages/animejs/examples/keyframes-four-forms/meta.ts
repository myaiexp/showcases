// animejs example: the four keyframe syntaxes compared
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/keyframes/';

export default defineMeta({
  title: 'Keyframe forms side by side',
  summary:
    'The same out-and-back motion written as tween values, tween parameters, duration-based keyframes and percentage-based keyframes, in four lanes.',
  section: 'Animation',
  tags: ['animate', 'keyframes', 'tween values', 'tween parameters', 'duration', 'delay'],
  docs: [
    `${base}tween-values-keyframes.md`,
    `${base}tween-parameters-keyframes.md`,
    `${base}duration-based-keyframes.md`,
    `${base}percentage-based-keyframes.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
