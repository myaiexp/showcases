// vega example: Events: Debounce
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Debounce',
  summary:
    'A filled dot follows every mousemove. A ring follows a stream debounced by 400 ms, so it jumps only when the pointer pauses and counts one event per burst.',
  section: 'Event Streams',
  tags: ['event.debounce', 'event.selector'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
