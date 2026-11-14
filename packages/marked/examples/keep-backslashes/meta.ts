// marked example: Keep backslashes in paths
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Keep backslashes in paths",
  summary:
    "A Windows path like C:\\Docs\\_Taxes\\(2024) keeps its backslashes instead of losing the ones before punctuation. It switches off tokenizer.escape; the cost is that \\*escaping\\* no longer works.",
  section: "Tokenizer",
  tags: ["tokenizer","escape","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
