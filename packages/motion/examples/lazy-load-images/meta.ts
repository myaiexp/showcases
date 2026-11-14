// motion example: Lazy-loading photo grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lazy-loading photo grid',
  summary: 'A photo gallery where each picture only loads when its tile scrolls close to view, then fades in over its grey placeholder. Nothing below the fold is fetched or painted until it is needed, so the page opens fast.',
  section: 'Gestures',
  tags: ['inView', 'margin', 'root', 'delay', 'animate'],
  docs: ['pages/motion-dev/docs/inview.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
