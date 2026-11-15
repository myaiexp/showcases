// d2 example: Legend for a C4 diagram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend for a C4 diagram",
  summary:
    "`vars.d2-legend` is a small diagram of its own that D2 lays out as a table in the corner: one row per shape and connection style. Helper shapes with opacity 0 are left out of the table, so only the connection styles get rows.",
  section: "C4",
  tags: ["d2-legend", "vars", "opacity"],
  docs: [
    "repo/blog/c4.md",
    "repo/static/d2/c4-legend.d2",
    "repo/static/d2/c4-models.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
