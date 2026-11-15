// vega example: CSV parsing: auto and explicit
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "CSV parsing: auto and explicit",
  summary:
    "A CSV string as values read three ways: all text, parse auto, and an explicit parse object; each cell shows its value and the type it got.",
  section: "Data",
  tags: ["data.format.type", "data.format.parse"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/docs/transforms/window.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
