// vega example: Band axis config
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Band axis config",
  summary:
    "The axisBand block restyles only axes over band scales: ticks and grid at band edges with tickBand extent, or bandPosition and tickExtra.",
  section: "Config",
  tags: ["config.axisBand", "axis.tickBand"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/axes.md",
    "repo/docs/docs/scales.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
