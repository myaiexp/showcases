// vega example: Config signals
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Config signals",
  summary:
    "A signal defined in config.signals scales the config's own text and axis font sizes, and can be bound or driven like any spec signal.",
  section: "Config",
  tags: ["config.signals", "config.text", "config.axis"],
  docs: ["repo/docs/docs/config.md", "repo/docs/docs/signals.md"],
  provenance: "pure",
  added: "2026-11-15",
});
