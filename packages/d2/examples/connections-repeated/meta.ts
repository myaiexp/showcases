// d2 example: Repeated connections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeated connections',
  summary:
    'Repeated connections never override an earlier one; each line declares a new connection between the same two shapes, so three lines draw three lines.',
  section: 'Connections',
  tags: ['connection', 'repeat'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
