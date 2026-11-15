// vega example: Events: Throttle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Throttle',
  summary:
    'A blue dot follows every mousemove while an orange one follows a stream throttled to one event per 300 ms, so it lags behind in steps and its counter grows slowly.',
  section: 'Event Streams',
  tags: ['event.throttle', 'event.selector'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
