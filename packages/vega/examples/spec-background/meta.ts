// vega example: Signal-valued background
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Signal-valued background",
  summary:
    "The view background is a signal expression mixed from a slider, so the whole view recolours as the value moves.",
  section: "Specification",
  tags: ["background", "signal.bind"],
  docs: [
    "repo/docs/docs/specification.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
