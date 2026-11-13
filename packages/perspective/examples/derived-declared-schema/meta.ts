// Perspective example: schema option of a derived Table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Declared schema for split columns',
  summary:
    'A derived Table has a fixed set of columns, so a split_by value that first appears later has nowhere to land. Two derived tables over the same query show it: one inferred, one with a declared schema that already holds a Wednesday column.',
  section: 'Derived Tables',
  tags: ['derived table', 'schema', 'split_by', 'null', 'replace', 'column_paths'],
  docs: ['repo/docs/md/explanation/derived_table.md', 'repo/docs/md/explanation/table/schema.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
