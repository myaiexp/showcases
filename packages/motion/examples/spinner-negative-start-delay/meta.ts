// motion example: Loading spinner that starts already spinning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading spinner that starts already spinning',
  summary: 'Two loading spinners side by side. With an ordinary stagger the segments light up one by one before the spinner looks complete; with a negative startDelay every segment starts part-way through its fade, so the spinner is spinning from the first frame.',
  section: 'Utils',
  tags: ['stagger', 'startDelay', 'negative delay', 'loading spinner'],
  docs: ['pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
