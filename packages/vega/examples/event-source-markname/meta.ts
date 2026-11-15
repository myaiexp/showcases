// vega example: Events: Named Mark Sources
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Named Mark Sources',
  summary:
    'Two sets of rects with different names. One responds to an @name selector, the other to the markname property, and a plain rect selector would see both.',
  section: 'Event Streams',
  tags: ['event.source', 'event.markname', 'mark.name'],
  docs: ['repo/docs/docs/event-streams.md', 'repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
