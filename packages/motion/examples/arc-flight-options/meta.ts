// motion example: Paper plane thrown along a tunable arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paper plane thrown along a tunable arc',
  summary: 'A paper plane is thrown back and forth between two pads while a dotted trail shows its path. Try arc() with different strength, peak, direction and rotate, driven by a bouncy spring that overshoots and settles along the curve.',
  section: 'Utils',
  tags: ['arc', 'strength', 'peak', 'direction', 'rotate', 'spring', 'frame.read'],
  docs: ['pages/motion-dev/docs/arc.md', 'pages/motion-dev/docs/frame.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
