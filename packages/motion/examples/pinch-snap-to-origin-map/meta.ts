// motion example: Map that springs back after a pinch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map that springs back after a pinch',
  summary: 'Zoom, twist and pan a small map with two fingers, then let go and it flies back to where it started. Pick how bouncy the return is, or turn the return off.',
  section: 'Gestures',
  tags: ['pinch', 'snapToOrigin', 'transition', 'spring'],
  docs: ['pages/motion-dev/docs/pinch.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
