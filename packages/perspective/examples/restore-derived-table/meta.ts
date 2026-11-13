// Perspective example: Derived tables in restore tokens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Derived tables in restore tokens",
  summary:
    "A single-panel restore() with an inline table definition builds a grouped derived Table, which save() writes back inline. The workspace form names derived tables once in derived_tables, one derived from another.",
  section: "Save and Restore",
  tags: ["derived_tables", "restore", "restoreWorkspace", "save", "get_hosted_table_names"],
  docs: ["repo/docs/md/how_to/javascript/save_restore.md", "repo/docs/md/explanation/derived_table.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
