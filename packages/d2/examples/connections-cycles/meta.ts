// d2 example: Cycles are okay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cycles are okay',
  summary:
    'D2 accepts connections that form a cycle: the last line below returns from Stage Four to Stage One, and the layout engine routes it around the chain.',
  section: 'Connections',
  tags: ['connection', 'cycle'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-4.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
