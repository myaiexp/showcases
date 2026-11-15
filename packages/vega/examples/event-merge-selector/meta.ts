// vega example: Events: Merged Selectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: Merged Selectors',
  summary:
    'A rect click and a symbol double click feed one merged selector; a merge object joins two mouseover streams. Each readout names the event that arrived and the mark it hit.',
  section: 'Event Streams',
  tags: ['event.merge', 'event.selector', 'event.marktype'],
  docs: ['repo/docs/docs/event-streams.md', 'repo/docs/docs/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
