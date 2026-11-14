// motion example: Rotate a print that snaps to the nearest angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotate a print that snaps to the nearest angle',
  summary: 'Twist a photo print with two fingers and let go: it springs to the nearest multiple of 15, 45 or 90 degrees, so it ends up straight.',
  section: 'Gestures',
  tags: ['pinch', 'rotate', 'snap', 'scale: false', 'pan: false'],
  docs: ['pages/motion-dev/docs/pinch.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
