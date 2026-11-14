// motion example: Quantity stepper that repeats while held
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quantity stepper that repeats while held',
  summary: 'A plus and minus counter: one click is one step, and holding a button makes it keep counting until you let go, like a shopping cart quantity.',
  section: 'Gestures',
  tags: ['press', 'hold', 'repeat', 'onRepeat'],
  docs: ['pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
