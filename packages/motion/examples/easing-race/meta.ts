// motion example: Easing race
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing race',
  summary: 'Runners cover the same distance in the same time, one per built-in easing, so you can see how each curve spends that time: slow start, slow finish, overshoot, or a wind-up before the lunge. The only thing that differs between lanes is the ease word passed to animate().',
  section: 'Easing',
  tags: ['ease', 'easeIn', 'easeOut', 'easeInOut', 'circIn', 'circOut', 'backIn', 'backOut', 'anticipate', 'linear', 'animate'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
