// marked example: Numbered lists as steps
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Numbered lists as steps",
  summary:
    "A recipe whose numbered list becomes a stack of step cards with round number badges, while the shopping list below stays an ordinary bullet list. It overrides renderer.list and returns false for bullet lists.",
  section: "Renderer",
  tags: ["renderer", "list", "ordered", "false"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
