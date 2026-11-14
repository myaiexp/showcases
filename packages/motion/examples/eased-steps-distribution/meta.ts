// motion example: Segmented meter with bursts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Segmented meter with bursts',
  summary: 'Two ten-segment loading meters over the same time. The first uses steps(10) alone, so segments light at an even pace. The second passes progress through circInOut before steps(10) quantises it, so the segments crawl, rush, then crawl again, the way a real install feels.',
  section: 'Easing',
  tags: ['ease', 'steps', 'circInOut', 'easing function', 'animate', 'repeat'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
