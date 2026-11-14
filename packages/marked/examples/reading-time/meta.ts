// marked example: Reading time
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Reading time",
  summary:
    "A badge above a post says how many words it has and how long it takes to read. walkTokens counts the words in every text token on the way to the HTML.",
  section: "Walk tokens",
  tags: ["walkTokens","text","word count"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
