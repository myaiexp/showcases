// motion example: Scroll offset explorer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll offset explorer',
  summary: 'A playground for scroll() offsets. Each end of the range is "a point on the target meets a point on the panel": pick names like start and end, numbers, pixels, percentages or vh, and the matching lines are drawn on the panel and the target while the progress counts from 0 to 1.',
  section: 'scroll',
  tags: ['scroll', 'offset', 'target', 'container', 'info', 'progress'],
  docs: ['pages/motion-dev/docs/scroll.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
