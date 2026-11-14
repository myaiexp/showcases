// marked example: Numbered headings
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Numbered headings",
  summary:
    "Headings get outline numbers (1, 1.1, 1.2, 2) that follow the structure of the page. walkTokens visits the headings in order and adds the number to each heading token.",
  section: "Walk tokens",
  tags: ["walkTokens","heading","tokens"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
