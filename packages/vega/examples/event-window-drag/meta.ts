// vega example: Events: Window Drag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Window Drag',
  summary:
    'Drag the rect with [rect:mousedown, window:mouseup] > window:mousemove. Window events keep arriving outside the view, so the rect follows the pointer even past the edges.',
  section: 'Event Streams',
  tags: ['event.between', 'event.source.window', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
