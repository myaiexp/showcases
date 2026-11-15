// vega example: Signal-valued url and format
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Signal-valued url and format",
  summary:
    "The data url and format type read signals, so choosing a file reloads and re-parses it; rows show whichever file is loaded.",
  section: "Data",
  tags: ["data.url", "data.format.type", "signal.bind"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/data/points.json",
    "repo/docs/data/stocks.csv",
    "repo/docs/data/airports.csv",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
