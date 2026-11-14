// motion example: Press button that cancels when you slide off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Press button that cancels when you slide off',
  summary: 'A pay button that only goes through if you let go while still on it. Press, slide off and release, and the press is cancelled; the log shows start and end with success true or false.',
  section: 'Gestures',
  tags: ['press', 'info.success', 'animate'],
  docs: ['pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
