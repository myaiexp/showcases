// marked example: Flagged table rows
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Flagged table rows",
  summary:
    "A parcel tracker where any row that says Late turns red. It overrides renderer.tablerow, which gets the row's cells as ready-made HTML, and returns false for the normal rows.",
  section: "Renderer",
  tags: ["renderer", "tablerow", "false"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
