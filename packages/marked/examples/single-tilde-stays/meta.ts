// marked example: Single tilde stays literal
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Single tilde stays literal",
  summary:
    "Writers who put ~3 hours~ for \"about\" no longer get words struck out; only ~~double tildes~~ strike. It overrides tokenizer.del to skip single-tilde pairs.",
  section: "Tokenizer",
  tags: ["tokenizer","del","gfm","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
