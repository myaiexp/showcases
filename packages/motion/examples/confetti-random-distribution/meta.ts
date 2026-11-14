// motion example: Confetti with a shaped random spread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Confetti with a shaped random spread',
  summary: 'A confetti cannon scatters pieces by feeding Math.random() into mix(). Left alone, they land evenly across the ground; pass the random number through easeOut and most travel far, through easeIn and most drop close. Fire a few bursts and watch the pile.',
  section: 'Utils',
  tags: ['mix', 'Math.random', 'easeOut', 'easeIn', 'distribution'],
  docs: ['pages/motion-dev/docs/mix.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
