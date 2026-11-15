// vega example: Events: Signal and Scale References
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Signal and Scale References',
  summary:
    'Moving a slider changes a signal and the scale built on it. Three counters show a signal reference, a scale reference and an array mixing a signal with clicks all firing.',
  section: 'Event Streams',
  tags: ['event.signal', 'event.scale', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md', 'repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
