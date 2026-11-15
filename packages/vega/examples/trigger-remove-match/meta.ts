// vega example: Remove by predicate
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Remove by predicate",
  summary:
    "A remove trigger with an object result removes every row matching its group, until a button or the page refills the set.",
  section: "Triggers",
  tags: ["data.on", "trigger.remove"],
  docs: [
    "repo/docs/docs/triggers.md",
    "repo/docs/docs/data.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/docs/api/view.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
