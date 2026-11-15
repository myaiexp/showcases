// d2 example: Foreign key connections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Foreign key connections',
  summary:
    'Writing `objects.disk -> disks.id` draws a connection between two tables, naming the rows involved. With the default dagre layout it ends at the table; with ELK it points at the exact row.',
  section: 'SQL Tables',
  tags: ['sql_table', 'connection', 'elk'],
  docs: ['repo/docs/tour/sql-tables.md', 'repo/static/d2/tables-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
