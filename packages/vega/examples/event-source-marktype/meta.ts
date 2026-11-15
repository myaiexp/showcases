// vega example: Events: Mark Type Sources
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Mark Type Sources',
  summary:
    'Click the rect, the circle or the empty background. Four counters show which selectors matched: the whole view, any mark, rects only, symbols only.',
  section: 'Event Streams',
  tags: ['event.source', 'event.marktype', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
