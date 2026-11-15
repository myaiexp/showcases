// vega example: Mark defaults
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mark defaults",
  summary:
    "Rect and symbol marks that name no colour take their fill, size and shape from config symbol and rect blocks, or a global mark opacity.",
  section: "Config",
  tags: ["config.mark", "config.symbol", "config.rect"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/marks.md",
    "repo/docs/docs/marks/symbol.md",
    "repo/docs/docs/marks/rect.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});
