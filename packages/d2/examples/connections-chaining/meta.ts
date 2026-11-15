// d2 example: Connection chaining
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Connection chaining',
  summary:
    'A chain such as `a -> b <- c: label` declares each link, and the label applies to every one of them. Arrow directions can differ along the chain.',
  section: 'Connections',
  tags: ['connection', 'chain'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-3.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
