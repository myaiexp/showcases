// motion example: Orbiting planets on a custom frame loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Orbiting planets on a custom frame loop',
  summary: 'Three planets circle a sun, moved by your own function that Motion calls every frame. Passing true as the second argument to frame.update keeps it running, and cancelFrame stops it, by hand or after a set number of frames.',
  section: 'Utils',
  tags: ['frame.update', 'keep-alive', 'cancelFrame'],
  docs: ['pages/motion-dev/docs/frame.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
