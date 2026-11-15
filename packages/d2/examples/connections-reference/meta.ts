// d2 example: Referencing a connection by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Referencing a connection by index',
  summary:
    'When two shapes have several connections, `(x -> y)[0]` is the first and `(x -> y)[1]` the second. The example sets a different stroke on each through that reference.',
  section: 'Connections',
  tags: ['connection', 'index', 'style'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-reference.d2', 'repo/docs/tour/style.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
