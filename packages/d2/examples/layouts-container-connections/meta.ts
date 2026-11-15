// d2 example: Layouts: connections between containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layouts: connections between containers',
  summary:
    'A connection from a shape in one container to a shape in another is not native to dagre: D2 adds a shim. ELK supports it directly and routes it orthogonally. The same source runs under each engine.',
  section: 'Layouts',
  tags: ['layout', 'container', 'connection', 'dagre', 'elk'],
  docs: ['repo/docs/tour/layouts.md', 'repo/docs/tour/dagre.md', 'repo/docs/tour/elk.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
