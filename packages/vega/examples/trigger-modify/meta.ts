// vega example: Modify data
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Modify data",
  summary:
    "A modify trigger with values rewrites the pressed bar's row, adding to its value and wrapping at the top.",
  section: "Triggers",
  tags: ["data.on", "trigger.modify", "trigger.values"],
  docs: [
    "repo/docs/docs/triggers.md",
    "repo/docs/docs/data.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
