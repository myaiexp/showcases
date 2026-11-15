// d2 example: SQL tables in containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SQL tables in containers',
  summary:
    'A `sql_table` is a shape like any other, so it sits inside a container (`cloud`), is connected to a sibling table, and receives a connection from a shape outside the tables.',
  section: 'SQL Tables',
  tags: ['sql_table', 'container', 'connection'],
  docs: ['repo/docs/tour/sql-tables.md', 'repo/static/d2/tables-3.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
