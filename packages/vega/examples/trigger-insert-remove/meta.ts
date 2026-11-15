// vega example: Insert and remove
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Insert and remove",
  summary:
    "A press inserts a dot at the pointer through a data trigger; a double-click removes them all with remove: true.",
  section: "Triggers",
  tags: ["data.on", "trigger.insert", "trigger.remove"],
  docs: [
    "repo/docs/docs/triggers.md",
    "repo/docs/docs/data.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/docs/event-streams.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
