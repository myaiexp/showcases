// vega example: Events: Consume and Wheel Zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Consume and Wheel Zoom',
  summary:
    'Scroll over the chart to zoom a row of circles about the pointer. The wheel! selector consumes the event, so the page does not scroll underneath.',
  section: 'Event Streams',
  tags: ['event.consume', 'event.type.wheel'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
