// motion example: Stickers that pause when off screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stickers that pause when off screen',
  summary: 'A sticker shelf where only the stickers you can see are spinning. Each one starts its loop on entering view and stops when it scrolls away, so a long page never animates what nobody is looking at.',
  section: 'Gestures',
  tags: ['inView', 'leave callback', 'root', 'animate', 'repeat'],
  docs: ['pages/motion-dev/docs/inview.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
