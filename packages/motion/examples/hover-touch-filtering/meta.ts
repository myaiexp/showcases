// motion example: Tooltip that ignores touch-emulated hovers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip that ignores touch-emulated hovers',
  summary: 'Phones fake a hover after a tap, which leaves tooltips stuck open. Replay a mouse and a touch input to see a hover() tooltip ignore the fake one while a raw listener sticks.',
  section: 'Gestures',
  tags: ['hover', 'pointerType', 'touch'],
  docs: ['pages/motion-dev/docs/hover.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
