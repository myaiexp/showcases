// vega example: Event bind setting
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Event bind setting",
  summary:
    "config events.bind set to any, container or none decides where signal inputs may appear; one input names its own element and is redirected or suppressed.",
  section: "Config",
  tags: ["config.events.bind", "signal.bind"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/signals.md",
    "repo/docs/docs/transforms/sequence.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
