// d2 example: Layouts: routing to table columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layouts: routing to table columns',
  summary:
    'ELK routes a connection to the exact column of a `sql_table` that it names, and dagre ends the connection at the table\'s edge. The two tabs compile one source with each engine.',
  section: 'Layouts',
  tags: ['layout', 'sql_table', 'elk', 'dagre'],
  docs: ['repo/docs/tour/elk.md', 'repo/docs/tour/dagre.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
