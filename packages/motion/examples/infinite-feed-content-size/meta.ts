// motion example: Feed that keeps its progress bar right as it grows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Feed that keeps its progress bar right as it grows',
  summary: 'An endless feed that loads more posts near the bottom. When content is added, the scrollable length changes but browsers send no event, so scroll() would show a stale number. trackContentSize: true makes it re-measure, and a toggle lets you compare the two.',
  section: 'scroll',
  tags: ['scroll', 'trackContentSize', 'container', 'callback'],
  docs: ['pages/motion-dev/docs/scroll.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
