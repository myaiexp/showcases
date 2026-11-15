// vega example: Autosize fit with padding
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Autosize fit with padding",
  summary:
    "With autosize fit the total size stays fixed, so a signal-valued padding squeezes the data rectangle; a label reports the width and height left.",
  section: "Specification",
  tags: ["autosize", "padding", "signal.bind"],
  docs: [
    "repo/docs/docs/specification.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
