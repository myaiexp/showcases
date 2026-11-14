// motion example: Ad viewability with amount and margin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ad viewability with amount and margin',
  summary: 'A column of ad slots scrolling past a window, each flagged in view or out. Choose how much of an ad must show (some, all, half) and grow or shrink the detection zone with a margin, and watch when each slot counts as seen.',
  section: 'Gestures',
  tags: ['inView', 'amount', 'margin', 'root'],
  docs: ['pages/motion-dev/docs/inview.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
