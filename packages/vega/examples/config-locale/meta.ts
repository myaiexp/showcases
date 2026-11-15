// vega example: Locale in config
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Locale in config",
  summary:
    "config locale gives numbers and dates a German format: currency, separators, month and day names in the axis labels and in format and utcFormat expressions.",
  section: "Config",
  tags: ["config.locale", "axis.format"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/api/locale.md",
    "repo/docs/docs/expressions.md",
    "repo/docs/docs/axes.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
