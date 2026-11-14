// marked example: Heat-mapped table cells
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Heat-mapped table cells",
  summary:
    "A café busyness table where each number is tinted from amber to red, so the busy slots jump out. It overrides renderer.tablecell for numeric body cells and lets the header and day names use the default.",
  section: "Renderer",
  tags: ["renderer", "tablecell", "false", "heat map"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
