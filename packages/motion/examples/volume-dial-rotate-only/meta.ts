// motion example: Volume knob you rotate with two fingers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Volume knob you rotate with two fingers',
  summary: 'A knob that only turns: it never zooms or moves, and stops at both ends of its sweep with a little give. The volume number follows its angle.',
  section: 'Gestures',
  tags: ['pinch', 'rotate', 'scale: false', 'pan: false', 'elastic', 'min', 'max'],
  docs: ['pages/motion-dev/docs/pinch.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
