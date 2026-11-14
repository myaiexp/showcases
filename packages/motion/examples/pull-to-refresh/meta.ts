// motion example: Pull-to-refresh with elastic overscroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pull-to-refresh with elastic overscroll',
  summary: 'Pull a feed down past its top and it stretches like rubber with a spinner appearing behind it. Pull far enough and it refreshes with a new post; otherwise it springs home.',
  section: 'Gestures',
  tags: ['drag', 'axis', 'constraints', 'elastic', 'onMove', 'onEnd'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
