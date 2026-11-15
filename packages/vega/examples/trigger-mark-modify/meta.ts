// vega example: Mark triggers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mark triggers",
  summary:
    "A trigger on a mark modifies the dragged item's x and y directly, without a data set; the circles are dragged by a pointer that goes down, moves and releases.",
  section: "Triggers",
  tags: ["mark.on", "trigger.modify", "event-stream.between"],
  docs: [
    "repo/docs/docs/triggers.md",
    "repo/docs/docs/marks.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/event-streams.md",
    "repo/docs/docs/expressions.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
