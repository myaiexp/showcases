// motion example: Toggle switch with spring physics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Settings toggle with real spring physics',
  summary: 'A switch whose knob is pulled by a spring. Stiffness, damping and mass decide whether it snaps, wobbles or drifts into place. The card compares a crisp switch with a loose one; the full view lets you tune your own.',
  section: 'animate',
  tags: ['animate', 'spring', 'stiffness', 'damping', 'mass', 'x'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
