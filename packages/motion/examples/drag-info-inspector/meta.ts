// motion example: Drag info inspector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag info inspector',
  summary: 'Drag and flick a ball to see everything a drag callback receives: where the pointer is, how far it just moved, how far from the start and how fast, drawn as lines and numbers.',
  section: 'Gestures',
  tags: ['drag', 'onStart', 'onMove', 'onEnd', 'onTransitionEnd', 'info'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
