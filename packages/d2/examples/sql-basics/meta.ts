// d2 example: SQL table basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SQL table basics',
  summary:
    'Under `shape: sql_table` each key is a column: its value is the type, and a `constraint` field in braces adds a constraint such as `primary_key`, which D2 shortens to PK.',
  section: 'SQL Tables',
  tags: ['sql_table', 'constraint'],
  docs: ['repo/docs/tour/sql-tables.md', 'repo/static/d2/tables-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
