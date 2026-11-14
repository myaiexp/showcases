// marked example: Maths in dollar signs
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Maths in dollar signs",
  summary:
    "A line that starts with $ a formula $ turns into a code chip, while a formula in the middle of a sentence stays plain. It overrides tokenizer.codespan with the docs' LaTeX example and falls back with false.",
  section: "Tokenizer",
  tags: ["tokenizer","codespan","false","lexer"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
