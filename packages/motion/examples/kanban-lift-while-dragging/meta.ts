// motion example: Kanban cards that lift while dragged
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kanban cards that lift while dragged',
  summary: 'Task cards that rise with a shadow and a small tilt while you hold them, and settle into a new column on release. A status line says dragging, settling or at rest.',
  section: 'Gestures',
  tags: ['drag', 'onStart', 'onEnd', 'onTransitionEnd', 'snapToOrigin'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
