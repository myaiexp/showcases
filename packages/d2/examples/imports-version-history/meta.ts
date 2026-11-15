// d2 example: Compare two versions of a schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compare two versions of a schema",
  summary:
    "history.d2 spreads users-v0.1.d2 and users-current.d2 into two containers placed side by side, so the old and new users tables (and the new emails table) can be compared in one diagram.",
  section: "Imports",
  tags: ["import", "sql_table", "quotes"],
  docs: [
    "repo/docs/tour/version-visualization.md",
    "repo/static/d2/imports-vv-history.d2",
    "repo/static/d2/users-v0.1.d2",
    "repo/static/d2/users-current.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
