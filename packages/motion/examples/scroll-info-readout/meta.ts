// motion example: Scroll inspector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll inspector',
  summary: 'A live readout of everything scroll() knows while you scroll a map in both directions: position, offset range, progress, scroll length and speed for each axis, plus the time of the reading. It is the second info argument of the callback, handy for debugging a scroll effect.',
  section: 'scroll',
  tags: ['scroll', 'info', 'velocity', 'progress', 'scrollLength', 'offset', 'container'],
  docs: ['pages/motion-dev/docs/scroll.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
