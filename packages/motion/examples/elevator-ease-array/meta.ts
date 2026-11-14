// motion example: Elevator stopping at floors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An elevator that stops at each floor',
  summary: 'A lift rides from the lobby to the top floor and back, pausing at each floor. One list of keyframes and an easing for every gap: still while the doors would open, smooth acceleration between floors.',
  section: 'animate',
  tags: ['animate', 'keyframes', 'ease array', 'easeInOut', 'linear', 'repeat'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
