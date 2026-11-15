// vega example: Events: Between Brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Between Brush',
  summary:
    'Drag across the chart to draw a brush. A between selector, [mousedown, window:mouseup] > window:mousemove, tracks the drag even when the pointer leaves the view.',
  section: 'Event Streams',
  tags: ['event.between', 'event.source.window'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
