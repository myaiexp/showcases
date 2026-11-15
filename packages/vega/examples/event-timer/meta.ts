// vega example: Events: Timer Ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Timer Ticks',
  summary:
    'Two timer streams with no input: a counter that ticks once a second and a clock hand that sweeps every 50 ms, plus a bar that grows with the seconds.',
  section: 'Event Streams',
  tags: ['event.timer', 'event.throttle'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
