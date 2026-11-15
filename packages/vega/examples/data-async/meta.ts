// vega example: Async loading
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Async loading",
  summary:
    "data.async lets two files load in the background while the chart and its slider stay live; a counter fills in as each file arrives.",
  section: "Data",
  tags: ["data.async", "data.url"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/data/stocks.csv",
    "repo/docs/data/airports.csv",
    "repo/docs/docs/transforms/filter.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
