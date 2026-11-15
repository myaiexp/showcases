// vega example: JSON property and copy
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "JSON property and copy",
  summary:
    "format.property digs rows out of a wrapped JSON document, and format.copy keeps the input unmodified when transforms write to the rows.",
  section: "Data",
  tags: ["data.format.property", "data.format.copy"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/transforms/formula.md",
    "repo/docs/docs/api/view.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
