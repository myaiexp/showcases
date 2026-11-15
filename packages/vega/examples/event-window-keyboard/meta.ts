// vega example: Events: Window Keyboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Window Keyboard',
  summary:
    'Arrow keys move a dot, using one window:keydown! stream per key with a bracket filter; another stream shows every key pressed and counts key releases.',
  section: 'Event Streams',
  tags: ['event.source.window', 'event.consume', 'event.filter'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
