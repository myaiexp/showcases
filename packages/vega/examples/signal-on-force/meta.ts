// vega example: Signal: force Propagates Unchanged Values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: force Propagates Unchanged Values',
  summary:
    'Click to set two signals to the same string every time. Only the handler with force: true keeps notifying its listeners, so one counter climbs and the other stops after the first click.',
  section: 'Signals',
  tags: ['signal.on.force', 'signal.on', 'event.signal'],
  docs: ['repo/docs/docs/signals.md', 'repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
