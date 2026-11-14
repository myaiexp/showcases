// motion example: Hold to delete
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hold to delete',
  summary: 'A bin button that needs to be held for a second. A ring fills while you hold and the file is deleted when it closes; let go early and the delete is cancelled.',
  section: 'Gestures',
  tags: ['press', 'hold', 'onHold', 'onComplete', 'info.success'],
  docs: ['pages/motion-dev/docs/press.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
