// marked example: Which hook runs first
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Which hook runs first",
  summary:
    "Two preprocess hooks that rewrite a shopping list, in either registration order. The log shows which ran first, and the page shows the result changing: with several use() calls the last registered hook runs first.",
  section: "Hooks",
  tags: ["hooks", "preprocess", "marked.use", "order"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
