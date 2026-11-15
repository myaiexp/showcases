// vega example: Loading a JSON file
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Loading a JSON file",
  summary:
    "data.url loads points.json with the default JSON format; a derived set filters the rows a slider reveals.",
  section: "Data",
  tags: ["data.url", "data.source", "data.transform"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/data/points.json",
    "repo/docs/docs/transforms/filter.md",
    "repo/docs/docs/signals.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
