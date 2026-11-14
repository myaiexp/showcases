// marked example: Headings switched off
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Headings switched off",
  summary:
    "A comment where \"# 1 fan of this place!\" stays ordinary text instead of becoming a giant heading. It overrides tokenizer.heading and tokenizer.lheading to return nothing, which switches the syntax off.",
  section: "Tokenizer",
  tags: ["tokenizer","heading","lheading","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Lexer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
