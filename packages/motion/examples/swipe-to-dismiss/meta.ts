// motion example: Swipe to dismiss notifications
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swipe to dismiss notifications',
  summary: 'A phone-style notification list. Drag a card sideways and let go: far or fast enough and it flies away while the others slide up, otherwise it springs back into place.',
  section: 'Gestures',
  tags: ['drag', 'axis', 'onEnd', 'velocity', 'spring'],
  docs: [
    'pages/motion-dev/docs/drag.md',
    'pages/motion-dev/docs/animate.md',
    'pages/motion-dev/docs/scope-motion.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
