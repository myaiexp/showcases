// motion example: Picture-in-picture window that snaps to a corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picture-in-picture window that snaps to a corner',
  summary: "A small floating video window you can throw anywhere. On release it glides to the nearest corner, taking your throw speed into account, like a phone's picture-in-picture.",
  section: 'Gestures',
  tags: ['drag', 'momentum', 'constraints', 'onEnd', 'animate'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
