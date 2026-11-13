// Animation example: global delay on a looping animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation delay on every tween',
  summary: 'A circle that moves and scales on a looping, alternating animation with a 500 ms delay before each run. The full view has a slider that rebuilds the animation with a delay from 0 to 2000 ms.',
  section: 'Animation',
  tags: ['animate', 'delay', 'loop', 'alternate'],
  docs: ['pages/animejs-com/documentation/animation/animation-playback-settings/delay.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
