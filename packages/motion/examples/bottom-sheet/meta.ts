// motion example: Drag-down bottom sheet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag-down bottom sheet',
  summary: 'A place card docked to the bottom of a map. Drag it down past a set distance, or flick it, and it closes; a short pull springs back. It reopens with a spring.',
  section: 'Gestures',
  tags: ['drag', 'axis', 'constraints', 'elastic', 'onEnd', 'velocity'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
