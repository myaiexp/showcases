// animejs example: animatable modifier and unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animatable modifier and unit',
  summary: 'Two clocks receive the same angle in radians through a rotate unit of rad; one runs it through utils.snap(), the other through a negating modifier.',
  section: 'Animatable',
  tags: ['createAnimatable', 'unit', 'modifier', 'utils.snap', 'duration', 'rotate'],
  docs: [
    'pages/animejs-com/documentation/animatable/animatable-settings/unit.md',
    'pages/animejs-com/documentation/animatable/animatable-settings/modifier.md',
    'pages/animejs-com/documentation/animatable/animatable-settings/duration.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
