// vega example: Toggle
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Toggle",
  summary:
    "A press toggles a bar's row in and out of a selection data set; selected bars are highlighted and listed.",
  section: "Triggers",
  tags: ["data.on", "trigger.toggle"],
  docs: [
    "repo/docs/docs/triggers.md",
    "repo/docs/docs/data.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/marks.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
