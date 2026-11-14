// marked example: A year is not a list
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "A year is not a list",
  summary:
    "A sentence that starts \"1986. A great year\" stays a sentence, while a real numbered shopping list still counts 1, 2, 3. It overrides tokenizer.list: nothing for years, false for everything else.",
  section: "Tokenizer",
  tags: ["tokenizer","list","false","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
