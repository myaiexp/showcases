// vega example: Events: External DOM Source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: External DOM Source',
  summary:
    'A CSS selector as the event source: the More and Less buttons sit outside the chart, and their clicks add and remove dots inside it.',
  section: 'Event Streams',
  tags: ['event.source', 'event.selector', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
