// motion example: Read receipts you can switch off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read receipts you can switch off',
  summary: 'A chat that marks each message as read the moment you scroll it into view, with an unread badge counting down. A privacy switch calls the stop function inView returns, after which nothing more is marked.',
  section: 'Gestures',
  tags: ['inView', 'stop', 'amount', 'root'],
  docs: ['pages/motion-dev/docs/inview.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
