// vega example: Autosize types
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Autosize types",
  summary:
    "The same chart sized by pad, fit, fit-x, fit-y and none in turn: pad grows the view for axes and legend, fit squeezes the data rectangle, none clips.",
  section: "Specification",
  tags: ["autosize", "autosize.type"],
  docs: [
    "repo/docs/docs/specification.md",
    "repo/docs/docs/legends.md",
    "repo/docs/docs/axes.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
