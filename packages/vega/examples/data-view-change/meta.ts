// vega example: Streaming with view.change
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Streaming with view.change",
  summary:
    "A declared but empty data set is filled from the page: view.change inserts a new row and removes an old one every tick, and the chart scrolls.",
  section: "Data",
  tags: ["data.name", "view.change"],
  docs: ["repo/docs/docs/data.md", "repo/docs/docs/api/view.md"],
  provenance: "pure",
  added: "2026-11-15",
});
