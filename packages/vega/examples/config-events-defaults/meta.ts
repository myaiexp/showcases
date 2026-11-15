// vega example: Event defaults
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Event defaults",
  summary:
    "config events.defaults decides which view events have their default browser action prevented: prevent true, allow a list, or prevent false, read back from each event's defaultPrevented flag.",
  section: "Config",
  tags: ["config.events.defaults", "signal.on"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/event-streams.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/expressions.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
