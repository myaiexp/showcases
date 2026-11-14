// marked example: Only a backslash breaks the line
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Only a backslash breaks the line",
  summary:
    "An address where invisible trailing spaces no longer start a new line, but a visible backslash at the end of a line still does. It overrides tokenizer.br: nothing for spaces, false for the backslash.",
  section: "Tokenizer",
  tags: ["tokenizer","br","false","line breaks"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
