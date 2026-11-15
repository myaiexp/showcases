// vega example: Events: Bracket Filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Bracket Filters',
  summary:
    'A grey dot follows every mousemove, an orange dot moves only while a button is held, and shift-clicking stamps green rings. Each stream is the same event with a bracket filter.',
  section: 'Event Streams',
  tags: ['event.filter', 'event.type', 'signal.on'],
  docs: ['repo/docs/docs/event-streams.md', 'repo/docs/docs/triggers.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
