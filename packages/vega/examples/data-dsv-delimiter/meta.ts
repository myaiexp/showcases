// vega example: DSV delimiter
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "DSV delimiter",
  summary:
    "format dsv with a pipe delimiter reads a custom-separated table with its own header, then bars are filtered by a slider.",
  section: "Data",
  tags: ["data.format.type", "data.format.delimiter"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/transforms/filter.md",
    "repo/docs/docs/signals.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
