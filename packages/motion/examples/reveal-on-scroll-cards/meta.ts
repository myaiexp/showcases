// motion example: Feed cards that reveal as you scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Feed cards that reveal as you scroll',
  summary: 'Posts in a news feed fade and slide up the first time they scroll into view, the way a social timeline loads in. inView watches a scrollable panel instead of the window, and by default fires once per card.',
  section: 'Gestures',
  tags: ['inView', 'root', 'amount', 'animate'],
  docs: ['pages/motion-dev/docs/inview.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
