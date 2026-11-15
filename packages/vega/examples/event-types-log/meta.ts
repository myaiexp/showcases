// vega example: Events: Types on the View
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Types on the View',
  summary:
    'Six counters, one per input event type the view receives (mousemove, mousedown, mouseup, click, dblclick, wheel), and a dot at the last pointer position.',
  section: 'Event Streams',
  tags: ['event.type', 'event.source.view', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md', 'repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
