// marked example: Links as numbered references
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Links as numbered references",
  summary:
    "Every link gets a small [1], [2] marker and the addresses are listed at the end, like a printed page. walkTokens numbers the links and adds a child token to each.",
  section: "Walk tokens",
  tags: ["walkTokens","link","tokens"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
