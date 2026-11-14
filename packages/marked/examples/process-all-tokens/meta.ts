// marked example: Cut the page at the rule
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Cut the page at the rule",
  summary:
    "A newsletter that shows only the part above the first rule, ending with Read more, when preview mode is on. The processAllTokens hook gets the whole token list at once, so it can drop and add blocks.",
  section: "Hooks",
  tags: ["hooks", "processAllTokens", "tokens"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
