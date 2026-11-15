// vega example: Inline values
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Inline values",
  summary:
    "Plain numbers in data.values load as rows with a data field, objects load as written; both are plotted and listed in a text table that follows live updates.",
  section: "Data",
  tags: ["data.values", "data.name"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/api/view.md",
    "repo/docs/docs/marks.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
