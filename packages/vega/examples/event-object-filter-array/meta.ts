// vega example: Events: Object Filter Array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Object Filter Array',
  summary:
    'Presses on a rect are counted three ways: any press, a Ctrl press with the left button (a filter array), and any Ctrl press (a single filter string).',
  section: 'Event Streams',
  tags: ['event.marktype', 'event.filter', 'event.type'],
  docs: ['repo/docs/docs/event-streams.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
