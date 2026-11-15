// d2 example: Reserved keywords as column names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reserved keywords as column names',
  summary:
    'Unquoted, `label` sets the table\'s label. Wrapped in quotes, `"label": string` becomes a row instead.',
  section: 'SQL Tables',
  tags: ['sql_table', 'escape'],
  docs: ['repo/docs/tour/sql-tables.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
