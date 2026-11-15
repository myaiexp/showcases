// d2 example: SQL constraint abbreviations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SQL constraint abbreviations',
  summary:
    'D2 recognises three constraint names and abbreviates them. Any other text is allowed and shown as written, and an array such as `[primary_key; unique]` shows several at once.',
  section: 'SQL Tables',
  tags: ['sql_table', 'constraint'],
  docs: ['repo/docs/tour/sql-tables.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
