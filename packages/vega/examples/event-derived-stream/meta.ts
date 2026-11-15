// vega example: Events: Derived Stream
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Derived Stream',
  summary:
    'A stream object wrapped in stream, filter and debounce. Shift-clicks on the rect count once per burst, while a plain rect:click counter counts every click.',
  section: 'Event Streams',
  tags: ['event.stream', 'event.filter', 'event.debounce'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
