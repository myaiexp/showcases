// motion example: Battery gauge from a raw charge value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Battery gauge from a raw charge value',
  summary: 'A battery icon that shows a cell voltage as a fill and a percentage. progress() converts the voltage between "empty" and "full" into a 0 to 1 amount, and clamp() stops a reading outside that range from overflowing the icon.',
  section: 'Utils',
  tags: ['progress', 'clamp', 'motionValue'],
  docs: ['pages/motion-dev/docs/progress.md', 'pages/motion-dev/docs/clamp.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
