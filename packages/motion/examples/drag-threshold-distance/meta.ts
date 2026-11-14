// motion example: Tap or drag: a photo that waits for a few pixels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tap or drag: a photo that waits for a few pixels',
  summary: 'A tray of photos you can tick with a tap or drag around. A press only counts as a drag once the pointer has moved past a threshold, measured with distance2D (or distance along one axis), so a slightly shaky tap still selects the photo.',
  section: 'Utils',
  tags: ['distance', 'distance2D', 'threshold', 'pointer'],
  docs: ['pages/motion-dev/docs/distance.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
