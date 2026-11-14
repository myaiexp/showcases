// motion example: Double-tap to like a photo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Double-tap to like a photo',
  summary: 'Double-click a photo and a heart pops up exactly where you clicked, while the like count rises. A single click does nothing. The time allowed between clicks is adjustable.',
  section: 'Gestures',
  tags: ['press', 'count', 'countTimeout', 'startEvent'],
  docs: ['pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
